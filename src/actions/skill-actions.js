import { skillConstans } from '../constants'

export const skillUpdate = (data) => dispatch => {
    dispatch({
        type: skillConstans.SINGLE_DATA,
        single_payload: data
    })
}