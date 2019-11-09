import React, { createContext, useReducer, useState } from 'react';

function userContextReducer(userState, action)
{
    console.log("Reducer:", action);
    let newState;
    switch (action.type)
    {
        case SIGN_IN:
            newState = { ...userState, ...action.payload, isLoggedIn: true };

            return newState;
        case SIGN_OUT:
            newState = { ...userState, session: null, name: null, isLoggedIn: false };

            return newState;
        default:
            throw new Error(`Action action.type = ${action.type} is not found.`);
    }
}

const InitialState = {
    isLoggedIn: false,
    sessionInfo: null,
    name: null,
};

const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const CHECK_IF_LOGGED_IN = "CHECK_IF_LOGGED_IN";

const userContext = createContext(InitialState);
function UserContextProvider({ children })
{
    const [state, dispatch] = useReducer(userContextReducer, InitialState);
    return (
        <userContext.Provider value={{ state, dispatch }}>
            {children}
        </userContext.Provider>
    );
}
export { userContext, UserContextProvider, SIGN_IN, SIGN_OUT, CHECK_IF_LOGGED_IN }