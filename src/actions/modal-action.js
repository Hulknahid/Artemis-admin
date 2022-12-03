import { modalConstants } from '../constants';

export const modalActions = {
    modalToggle
}


function modalToggle(reqType) {
    return {
        type: modalConstants.MODAL_TOGGLE,
        action: reqType
    }
}
