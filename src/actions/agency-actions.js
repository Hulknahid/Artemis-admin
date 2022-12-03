import { agenciesConstants } from '../constants';
import { agencyService, userService } from '../services'

// Fetch All Data 
export const getAgenceisWithPaginte = (pageNo, pageSize) => dispatch => {

    dispatch({
        type: agenciesConstants.GET_ALL_AGENCIES_REQUEST
    })

    agencyService.fetchAgenciesWithPaginate(pageNo, pageSize)
        .then(agency => {
            dispatch({
                type: agenciesConstants.GET_AGENCIES_PAGINATE_SUCCESS,
                payload: agency.data
            })
        })
        .catch(err => {
            userService.logout()
        })
}
// Fetch All Data 
// export const getAgenceis = () => dispatch => {

//     dispatch({
//         type: agenciesConstants.GET_ALL_AGENCIES_REQUEST
//     })

//     agencyService.fetchAgencies()
//         .then(agency => {
//             dispatch({
//                 type: agenciesConstants.GET_ALL_AGENCIES_SUCCESS,
//                 payload: agency.data.records
//             })
//         })
//         .catch(err => {
//             userService.logout()
//         })
// }

// Create Agency 
export const createAgency = (data) => dispatch => {
    agencyService.createAgency(data)
        .then(agency => {
            dispatch({
                type: agenciesConstants.CREATE_AGENCY,
                success: 'success'
            })


            // Again Fetch The All Data
            dispatch({
                type: agenciesConstants.GET_ALL_AGENCIES_REQUEST
            })
            agencyService.fetchAgencies()
                .then(agency => {
                    dispatch({
                        type: agenciesConstants.GET_ALL_AGENCIES_SUCCESS,
                        payload: agency.data.records
                    })
                })
                .catch(err => console.log(err.response))

        })
        .catch(err => {
            dispatch({
                type: agenciesConstants.CREATE_FAILURE,
                errors: err.response.data
            })
        })
}

// Edit Agency 
export const editAgency = (data, id) => dispatch => {
    agencyService.editAgency(data, id)
        .then(agency => {
            dispatch({
                type: agenciesConstants.AGENCY_EDIT,
                payload: 'Agency Edit Success'
            })

            // Again Fetch The All Data
            dispatch({
                type: agenciesConstants.GET_ALL_AGENCIES_REQUEST
            })
            agencyService.fetchAgencies()
                .then(agency => {
                    dispatch({
                        type: agenciesConstants.GET_ALL_AGENCIES_SUCCESS,
                        payload: agency.data.records
                    })
                })
                .catch(err => console.log(err.response))
        })
        .catch(err => {
            dispatch({
                type: agenciesConstants.AGENCY_EDIT_FAILURE,
                errors: err.response.data,
            })
        })
}

// Edit Agency 
export const editAgencyImg = (data, id) => dispatch => {
    agencyService.editAgencyImg(data, id)
        .then(agency => {
            console.log('Agency Image Change successfull');
        })
        .catch(err => {
            console.log(err.response)
        })
}


// Agency Modal Open 
export const agencyModalOpen = () => {
    return {
        type: agenciesConstants.AGENCY_MODAL_OPEN,
    }
}

// Agency Modal Close
export const agencyModalClose = () => {
    return {
        type: agenciesConstants.AGENCY_MODAL_CLOSE,
    }
}