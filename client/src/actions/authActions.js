import axios from 'axios';
import {
    returnErrors
} from './errorActions';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGITER_FAIL
} from "./types";

// check token and load user

export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({
        type: USER_LOADING
    });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch( returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            });
        });
}

//register User
export const register = ({ firstName, lastName, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    const body = JSON.stringify({ firstName, lastName, email, password});

    axios.post('/api/user', body, config)
        .then(res => dispatch({
           type: REGISTER_SUCCESS,
           payload: res.data
        }))
        .catch(err => {
            dispatch( returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGITER_FAIL
            })
        })
}

// Login User

export const login = ({ email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    const body = JSON.stringify({ email, password});

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
           type: LOGIN_SUCCESS,
           payload: res.data
        }))
        .catch(err => {
            dispatch( returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}




// Logout User 
export const logout = () =>{
    return {
        type: LOGOUT_SUCCESS
    };
}

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    //Headers
    const config = {
        header: {
            "Content-type": "application/json"
        }
    }
    // if token, add to headers
    if (token) {
        config.header['x-auth-token'] = token;
    }

    return config;
}