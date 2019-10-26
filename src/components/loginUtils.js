import {
	CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser
} from 'amazon-cognito-identity-js';
import {Config, CognitoIdentityCredentials} from 'aws-sdk';
import awsConfig from '../../aws-exports';

// configuring the identify pool (federated idenetity)
Config.region = awsConfig.cognito.REGION;
Config.credentials = new CognitoIdentityCredentials({
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

export function signUp(userData)
{
    let attributesList = [];
    let emailData = {
        Name: 'email',
        Value: userData.email
    }
    let emailAtt = new CognitoUserAttribute(emailData);
    let phoneData = {
        Name: 'phone_number',
        Value: userData.phone
    }
    let phoneAtt = new CognitoUserAttribute(phoneData);

    attributesList.push(emailAtt, phoneAtt);

    userPool.signUp(userData.username, userData.password, attributesList, null, (err, result) => {
        if(err)
        {
            alert(err.message || JSON.stringify(err));
            return;
        }
        let currentUser = result.user;
        console.log("New User sign up", currentUser.getUsername());
    })

}

// log the current user out
export function logUserOut()
{

}