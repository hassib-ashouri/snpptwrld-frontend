import
{
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';
import { config, CognitoIdentityCredentials } from 'aws-sdk';
console.log("The region is", process.env.GATSBY_COGNITO_REGION)
// configuring the identify pool (federated idenetity)
config.region = process.env.GATSBY_COGNITO_REGION;
config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID
});
const userPool = new CognitoUserPool({
    UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
    ClientId: process.env.GATSBY_COGNITO_APP_CLIENT_ID
});




function helperGetSessionOf(_user)
{
    return new Promise((resolve, reject) =>
    {
        _user.getSession(
            (error, session) =>
            {
                if (error)
                {
                    return reject(error);
                }

                return resolve(session);
            }
        )
    })
}

function helperGetUserAttributesOf(_user)
{
    return new Promise(
        (resolve, reject) =>
        {
            _user.getUserAttributes(
                (err, attributes) => 
                {
                    if (err)
                    {
                        return reject(err)
                    }

                    return resolve(attributes);
                });
        }
    )
}


/**
 * see if this device was logged in before
 * @returns {bool} whether the device was logged in or not.
 */
export function wasDeviceLoggedIn()
{
    return new Promise(
        async (resolve, reject) =>
        {
            let user = userPool.getCurrentUser();
            if (user !== null)
            {
                let session = await helperGetSessionOf(user);
                console.log("Session Validity", session.isValid());
                // recreate credentials from the token.
                // needed in case user reopens the website after closing it
                config.credentials = new CognitoIdentityCredentials(
                    {
                        IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
                        Logins: {
                            // Change the key below according to the specific region your user pool is in.
                            [`cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.GATSBY_COGNITO_USER_POOL_ID}`]: session.getIdToken().getJwtToken(),
                        },
                    });
                // authenticate using the updated credentials
                config.credentials.refresh(
                    err => 
                    {
                        if (err)
                        {
                            throw err.message || JSON.stringify(err);
                        }

                        console.log("Logged in with no broblem");
                    });

                let [, , nameAtt] = await helperGetUserAttributesOf(user);
                resolve({ name: nameAtt.Value, sessionInfo: session });
            }
            else
            {
                reject("No valid tokens in storage.");
            }

        }
    )
}

/**
 * returns a new user object.
 * @param {*} userData 
 * @returns {CognitoUser} the object of user after signing up
 */
export async function signUp(userData)
{
    return new Promise((resolve, reject) =>
    {
        let attributesList = [];
        let emailData = {
            Name: 'email',
            Value: userData.email
        }
        let emailAtt = new CognitoUserAttribute(emailData);
        let phoneData = {
            Name: 'phone_number',
            Value: '+1' + userData.phone
        }
        let phoneAtt = new CognitoUserAttribute(phoneData);

        let nameData = {
            Name: 'name',
            Value: `${userData.fname} ${userData.lname}`
        }
        let nameAtt = new CognitoUserAttribute(nameData);

        attributesList.push(emailAtt, phoneAtt, nameAtt);

        userPool.signUp(userData.username, userData.password, attributesList, null, (err, result) =>
        {
            if (err)
            {
                alert(err.message || JSON.stringify(err));
                reject(err);
            }
            let currentUser = result.user;
            resolve(currentUser);
        });
    });
}

/**
 * authenticate the user and get the session infor
 * @param {{username:string, password:string}} userCredentials login info
 * 
 * @returns {{session,name,username}}
 */
export function logIn(userCredentials)
{
    return new Promise((resolve, reject) =>
    {
        let authenticaitonDetails = new AuthenticationDetails({
            Username: userCredentials.username,
            Password: userCredentials.password
        });

        let congnitoUser = new CognitoUser({
            Username: userCredentials.username,
            Pool: userPool
        });

        congnitoUser.authenticateUser(authenticaitonDetails, {
            onSuccess: async result => 
            {
                console.log(result);
                // get the session data
                let accessToken = result.getAccessToken().getJwtToken();
                let idToken = result.getIdToken().getJwtToken();

                config.credentials = new CognitoIdentityCredentials({
                    IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        [`cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.GATSBY_COGNITO_USER_POOL_ID}`]: idToken,
                    },
                });

                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                config.credentials.refresh(
                    error => 
                    {
                        if (error) 
                        {
                            reject(error.message || JSON.stringify(error));
                            return;
                        }

                    });

                let atts = await helperGetUserAttributesOf(congnitoUser);
                let [, , nameAtt] = atts;
                console.log(atts);
                resolve({ session: accessToken, name: nameAtt.Value, username: userCredentials.username });

            },
            onFailure: err =>
            {
                reject(err.message || JSON.stringify(err));
                return;
            }
        });
    });
}

// log the current user out
export function logUserOut()
{
    let user = userPool.getCurrentUser();
    if (user !== null)
    {
        user.signOut();
        return true;
    }
    return false;
}