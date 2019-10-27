import {
	CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';
import {config, CognitoIdentityCredentials} from 'aws-sdk';
import awsConfig from '../../aws-exports';

// configuring the identify pool (federated idenetity)
config.region = awsConfig.cognito.REGION;
config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: awsConfig.cognito.IDENTITY_POOL_ID
});
const userPool = new CognitoUserPool({
    UserPoolId: awsConfig.cognito.USER_POOL_ID,
    ClientId: awsConfig.cognito.APP_CLIENT_ID
});



/**
 * see if this device was logged in before
 * @returns {bool} whether the device was logged in or not.
 */
 export function wasDeviceLoggedIn()
{
    // this should return to me weather this device was logged in.
    // CognitoUser.getDevice({
    //     onSuccess: success => {
    //         console.log('call result: ' + success);
    //     },
    //     onFailure: err => {
    //         alert(err.message || JSON.stringify(err));
    //     }
    // });

    return false;
}

/**
 * returns a new user object.
 * @param {*} userData 
 * @returns {CognitoUser} the object of user after signing up
 */
export async function signUp(userData)
{
    return new Promise( (resolve, reject) => {
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
    
        userPool.signUp(userData.username, userData.password, attributesList, null, (err, result) => {
            if(err)
            {
                alert(err.message || JSON.stringify(err));
                reject(err);
            }
            let currentUser = result.user;
            resolve(currentUser);
        });
    });
}

export async function logIn(userCredentials)
{
    return new Promise((resolve, reject) => {
        let authenticaitonDetails = new AuthenticationDetails({
            Username: userCredentials.username,
            Password: userCredentials.password
        });

        let congnitoUser = new CognitoUser({
            Username: userCredentials.username,
            Pool: userPool
        });

        congnitoUser.authenticateUser(authenticaitonDetails, {
            onSuccess: result => {
                // get the session data
                let accessToken = result.getAccessToken().getJwtToken();
                let idToken = result.getIdToken().getJwtToken();

                config.credentials = new CognitoIdentityCredentials({
                    IdentityPoolId: awsConfig.cognito.IDENTITY_POOL_ID, // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        [`cognito-idp.${awsConfig.cognito.REGION}.amazonaws.com/${awsConfig.cognito.USER_POOL_ID}`]: idToken,
                    },
                });
                
                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
		        config.credentials.refresh(error => {
                    if (error) 
                    {
                        reject(error);
                    } 
                    else 
                    {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        // example: var s3 = new AWS.S3();
                        resolve(accessToken);
                    }
                });
                
            },
            onFailure: err => {
                reject(err);
            }
        });
    });
}

// log the current user out
export function logUserOut()
{

}