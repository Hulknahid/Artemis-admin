import { clientsConstants } from '../constants';

const initialState = {
    clients: [],
    clientsLoading: true,
    clientsWithPaginate: []
}

const clientReducer = (state = initialState, action) => {

    switch (action.type) {

        // All Clients Request 
        case clientsConstants.GET_ALL_CLIENTS_REQUEST:
            return {
                ...state,
                clientsLoading: true
            }

        // Get All Clients Success 
        case clientsConstants.GET_ALL_CLIENTS_SUCCESS:
            return {
                ...state,
                clientsLoading: false,
                clients: action.payload,
            }
        // Get All Clients Success 
        case clientsConstants.GET_CLIENTS_PAGINATE_SUCCESS:
            return {
                ...state,
                clientsLoading: false,
                clientsWithPaginate: action.payload.records,
                totalClients: action.payload.totalCount
            }

        // Create Client 
        case clientsConstants.CREATE_CLIENT:
            return {
                ...state,
                success: action.success,
                modal: false
            }

        // Create Client Failure 
        case clientsConstants.CREATE_CLIENT_FAILURE:
            return {
                ...state,
                errors: action.errors,
                modal: true
            }

        // Client Modal Open 
        case clientsConstants.CLIENT_MODAL_OPEN:
            return {
                ...state,
                modal: true
            }

        // Client Modal close 
        case clientsConstants.CLIENT_MODAL_CLOSE:
            return {
                ...state,
                errors: '',
                modal: false
            }

        // Client Update 
        case clientsConstants.CLIENT_EDIT:
            return {
                ...state,
                success: action.payload,
            }

        // Client Update Failure 
        case clientsConstants.CLIENT_EDIT_FAILURE:
            return {
                ...state,
                errors: action.errors,
                modal: true
            }

        default:
            return state;
    }
}

export default clientReducer