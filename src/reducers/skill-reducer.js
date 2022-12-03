import { skillConstans } from '../constants';




const skillReducer = (state = {}, action) => {
    switch (action.type) {
        case skillConstans.SINGLE_DATA:
            return action.single_payload

        default:
            return state
    }
}

export default skillReducer;