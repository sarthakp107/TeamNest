import { createContext, useState, useEffect, useReducer, Children } from "react";
import { projectAuth } from "../firebase/config";
import { type } from "@testing-library/user-event/dist/type";

//AuthContext.Provider is used to share data, but it doesn’t handle any logic.
//AuthContextProvider sets up everything (like managing the user state and checking if the user is logged in)
// and then uses AuthContext.Provider to pass this data to other components.

export const AuthContext = createContext();
export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}
        default:
            return state
    }
}
export const AuthContextProvider = ({children}) => {
    const[state , dispatch] = useReducer(authReducer, {
        user:null,
        authIsReady: false
    })

    useEffect(()=> {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({type : 'AUTH_IS_READY', payload: user})
            unsub();
        })
    }, [])

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
        {children}
        </AuthContext.Provider>
    )
}