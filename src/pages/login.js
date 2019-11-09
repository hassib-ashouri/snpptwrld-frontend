import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as LoginUtils from '../components/loginUtils';
import { navigate } from "@reach/router";
import { userContext, SIGN_IN, UserContextProvider } from '../context/userContext';

function Copyright()
{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Snpptwrld.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogInPage(props)
{
  const classes = useStyles();
  const context = useContext(userContext);
  const {state, dispatch} = context;
  
  const [formInputData, setFormInputData] = useState({});
  // handler to update state when input fields are filled
  const inputDataHandler = dataKey => event =>
  {
    let newFormInputData = { ...formInputData };
    newFormInputData[dataKey] = event.target.value;
    setFormInputData(newFormInputData);
  }
  
  
  // click sign in handler
  const signInHandler = () =>
  {
    // form validateion can happen here
    // login if successful update state and navigate
    LoginUtils.logIn({
      username: formInputData.username,
      password: formInputData.password,
    }).then(
      loggedInUserInfo => 
      {
        console.log("The context from login page:", context);
        dispatch({ type: SIGN_IN, payload: { ...loggedInUserInfo }});
        navigate('/');
      },
      reason =>
      {
        alert(reason);
      }
    )
  };

  useEffect(() => console.log("The context from login page:", context));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={inputDataHandler("username")}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={inputDataHandler('password')}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={signInHandler}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
