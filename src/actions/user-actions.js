import { userConstants } from '../constants/'
import { userService } from '../services'
import {SetAuthToken} from "../axious-config";

export const loginAction = (data, history) => dispatch => {

    dispatch({
        type: userConstants.LOGIN_REQUEST
    })

    // User Service Login
    userService.login(data)
        .then(user => {
            dispatch({
                type: userConstants.LOGIN_SUCCESS,
                payload: user.data
            });
            SetAuthToken(user.token)
            history.push('/dashboard')
        })
        .catch(() => {
            dispatch({
                type: userConstants.LOGIN_FAILURE,
                errMsg: 'Username or Password is wrong.'
            });
        })
}

export const logoutAction = (history) => dispatch => {
    dispatch({
        type: userConstants.LOGOUT_USER
    })
    history.push('/login')
    userService.logout()
}

export const emptyError = () => {
    return {
        type: userConstants.LOGIN_ERROR_REMOVE
    }
}



