import { modalConstants } from '../constants';

const initialState = {
    modal: false
}


const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case modalConstants.MODAL_TOGGLE:
            return {
                ...state,
                modal: !state.modal,
                reqType: !state.modal ? action.action : ""
            }

        default:
            return state
    }
}

export default modalReducer;
