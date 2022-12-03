import { userConstants } from '../constants';


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

// Authentication
const authentication = (state = initialState, action) => {
    switch (action.type) {

        // Login Request 
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: null
            };
        // Login Success 
        case userConstants.LOGIN_SUCCESS:
            return {
                loggingIn: false,
                loggedIn: true,
                user: action.payload
            };

        // Login Failure 
        case userConstants.LOGIN_FAILURE:
            return {
                loginFailure: true,
                loggingIn: false,
                failureMessage: action.errMsg,
                user: null
            };
        // logout user 
        case userConstants.LOGOUT_USER:
            return {};

        // login Error Remove 
        case userConstants.LOGIN_ERROR_REMOVE:
            return {
                error: ''
            };

        default:
            return state
    }
}


export default authentication;