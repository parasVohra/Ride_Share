import {
    combineReducers
} from 'redux';
import loggedReducer from './isLogged';
import errorReducer from './errorReducer';
import authReducer from './authReducer';


const allReducers = combineReducers({
    isLogged: loggedReducer,
    error: errorReducer,
    auth: authReducer

})

export default allReducers;