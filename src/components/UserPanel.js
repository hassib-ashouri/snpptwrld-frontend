import React, { useContext, useEffect } from "react"
import 
{
    userContext,
    SIGN_OUT,
    SIGN_IN,
} from "../context/userContext";
import * as LoginUtils from './loginUtils';
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MailIcon from "@material-ui/icons/Mail"
import { navigate } from "@reach/router";


function LoggedInPanel(props)
{
    const { state, dispatch } = useContext(userContext);
    useEffect(() => console.log("State from LoggedInPanel:", state));
    const logoutBtnHandler = () =>
    {
        if (LoginUtils.logUserOut())
        {
            dispatch({ type: SIGN_OUT });
        }
        else
        {
            alert("Loggin out problem. Logged in user is not found.");
        }
    }
    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary={`Hello, ${state.name}`} />
            </ListItem>
            <ListItem button key={"logout"} onClick={logoutBtnHandler}>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary={'Log Out'} />
            </ListItem>
        </>
    )
};

function LoggedOutPanel(props)
{
    const { state, dispatch } = useContext(userContext);
    useEffect(() => console.log("State from LoggedOutPanel:", state));
    const loginBtnHandler = () =>
    {
        LoginUtils.wasDeviceLoggedIn().then(
            loginInfo =>
            {
                // update the state with log info
                dispatch({ type: SIGN_IN, payload: {...loginInfo} });
            },
            reason =>
            { // if not logged in for any reason, provide reason then navigate to login page
                // no need to aler. for any problem, just have the user login again
                // alert(reason);
                // give dispatcher to log in page so it can update state based on a successful login
                navigate('/login');
            }
        )
    }

    const signupBtnHandler = () =>
    {
        navigate('/signup');
    }

    return (
        <>
            <ListItem button key={"login"} onClick={loginBtnHandler}>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary={'Log In'} />
            </ListItem>
            <ListItem button key={"signup"} onClick={signupBtnHandler}>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary={'Sign Up'} />
            </ListItem>
        </>
    )
};

export default function UserPanel(props)
{
    const { state:{isLoggedIn} = {isLoggedIn: false} } = useContext(userContext);
    let toRender = isLoggedIn ? (<LoggedInPanel />) : (<LoggedOutPanel />);
    return (
        <>
            {toRender}
        </>
    )
}