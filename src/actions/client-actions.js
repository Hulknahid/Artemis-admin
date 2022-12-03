import { clientsConstants } from '../constants';
import { clientService, userService } from '../services'

export const getClientsWithPaginate = (pageNo, pageSize) => dispatch => {

    dispatch({
        type: clientsConstants.GET_ALL_CLIENTS_REQUEST
    })

    clientService.fetchClientsWithPaginate(pageNo, pageSize)
        .then(client => {
            dispatch({
                type: clientsConstants.GET_CLIENTS_PAGINATE_SUCCESS,
                payload: client.data
            })
        })
        .catch(err => {
            userService.logout()
        })
}


// Fetch All Data 
export const getClients = () => dispatch => {

    dispatch({
        type: clientsConstants.GET_CLIENTS_PAGINATE_REQUEST
    })

    clientService.fetchClients()
        .then(client => {
            dispatch({
                type: clientsConstants.GET_ALL_CLIENTS_SUCCESS,
                payload: client.data.records
            })
        })
        .catch(err => {
            userService.logout()
        })
}

// Create Client 
export const createClient = (data) => dispatch => {
    clientService.createClient(data)
        .then(() => {
            dispatch({
                type: clientsConstants.CREATE_CLIENT,
                success: 'success'
            })

            // Again Fetch The All Data
            dispatch({
                type: clientsConstants.GET_ALL_CLIENTS_REQUEST
            })
            clientService.fetchClients()
                .then(client => {
                    dispatch({
                        type: clientsConstants.GET_ALL_CLIENTS_SUCCESS,
                        payload: client.data.records
                    })
                })
                .catch(err => console.log(err.response))

        })
        .catch(err => {
            dispatch({
                type: clientsConstants.CREATE_CLIENT_FAILURE,
                errors: err.response.data
            })
        })
}

// Edit Client
export const editClient = (data, id) => dispatch => {
    clientService.editClient(data, id)
        .then(() => {
            dispatch({
                type: clientsConstants.CLIENT_EDIT,
                payload: 'Client Edit Success'
            })

            // Again Fetch The All Data
            dispatch({
                type: clientsConstants.GET_ALL_CLIENTS_REQUEST
            })
            clientService.fetchClients()
                .then(client => {
                    dispatch({
                        type: clientsConstants.GET_ALL_CLIENTS_SUCCESS,
                        payload: client.data
                    })
                })
                .catch(err => console.log(err.response))
        })
        .catch(err => {
            dispatch({
                type: clientsConstants.CLIENT_EDIT_FAILURE,
                errors: err.response.data
            })
        })
}

// Edit Client Image 
export const editClientImg = (data, id) => dispatch => {
    clientService.editClientImg(data, id)
        .then(() => {
            console.log('Client Image Change successfull');
        })
        .catch(err => {
            console.log(err.response)
        })
}


// Client Modal Open 
export const clientModalOpen = () => {
    return {
        type: clientsConstants.CLIENT_MODAL_OPEN,
    }
}

// Client Modal Close
export const clientModalClose = () => {
    return {
        type: clientsConstants.CLIENT_MODAL_CLOSE,
    }
}