import { contactConstants, profileConstans, } from '../constants';
import { contactService } from '../services'


// Get Profile route and Id 
export const getProfileRouteInfo = (route, id) => dispatch => {
    dispatch({
        type: contactConstants.GET_PRPFILE_ROUTE_ID,
        id: id,
        route: route
    })
}


// Get Contact by id 
export const getAllContactsById = (route, id) => dispatch => {
    // Get All Contacts By Id
    console.log(route);

    dispatch({
        type: contactConstants.GET_ALL_CONTACT_BY_ID_REQUEST
    })
    contactService.fetchContactsById(route, id)
        .then(res => dispatch({
            type: contactConstants.GET_ALL_CONTACT_BY_ID_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: profileConstans.PROFILE_CONTACTS_FAILURE,
                contactError: err.response,
            })
        })

}



// Create contact 
export const createContact = (route, profileId, data) => dispatch => {
    contactService.createContact(route, data)
        .then(() => {
            dispatch({
                type: contactConstants.CREATE_CONTACT,
                success: 'success'
            })

            dispatch({
                type: contactConstants.CONTACT_CREATE_MODAL_CLOSE,
            })

            // Get All Contacts 
            contactService.fetchContactsById(route, profileId)
                .then(res => dispatch({
                    type: contactConstants.GET_ALL_CONTACT_BY_ID_SUCCESS,
                    payload: res.data
                }))
                .catch(err => {
                    dispatch({
                        type: profileConstans.PROFILE_CONTACTS_FAILURE,
                        contactError: err.response,
                    })
                })


        })
        .catch(err => {
            dispatch({
                type: contactConstants.CREATE_CONTACT_FAILURE,
                contactError: err.response.data,
            })
        })
}

// Update Contact 
export const updateContact = (contactId, profileRoute, data, profileId) => dispatch => {
    contactService.updateContact(contactId, profileRoute, data)
        .then(() => {
            dispatch({
                type: contactConstants.UPDATE_CONTACT
            })

            dispatch({
                type: contactConstants.CONTACT_CREATE_MODAL_CLOSE,
            })

            // Get All Contacts 
            contactService.fetchContactsById(profileRoute, profileId)
                .then(res => dispatch({
                    type: contactConstants.GET_ALL_CONTACT_BY_ID_SUCCESS,
                    payload: res.data
                }))
                .catch(err => {
                    dispatch({
                        type: profileConstans.PROFILE_CONTACTS_FAILURE,
                        contactError: err.response,
                    })
                })


        })
        .catch(err => {
            // Update Contact Failure 
            dispatch({
                type: contactConstants.UPDATE_CONTACT_FAILURE,
                contactError: err.response.data,
            })
        })
}




// Edit Contact Image
export const updateContactImg = (route, contactId, data, profileId) => dispatch => {
    contactService.updateContactImg(route, contactId, data)
        .then(agency => {
            // Get All Contacts 
            contactService.fetchContactsById(route, profileId)
                .then(res => dispatch({
                    type: contactConstants.GET_ALL_CONTACT_BY_ID_SUCCESS,
                    payload: res.data
                }))
                .catch(err => {
                    dispatch({
                        type: profileConstans.PROFILE_CONTACTS_FAILURE,
                        contactError: err.response,
                    })
                })
        })
        .catch(err => {
            console.log(err.response)
        })
}



export const allAgencyContacts = () => dispatch => {
    // All Agency Contacts 
    dispatch({
        type: contactConstants.GET_ALL_AGENCY_CONTACT_REQUEST
    })
    contactService.fetchAllAgencyContact()
        .then(res => {
            // console.log(res.data);
            dispatch({
                type: contactConstants.GET_ALL_AGENCY_CONTACT_SUCCESS,
                allAgencyContacts: res.data
            })
        })
        .catch(err => console.log(err))
}


// Contact Create Modal Open 
export const contactCreateModalOpen = () => {
    return {
        type: contactConstants.CONTACT_CREATE_MODAL_OPEN,
    }
}

// Contact Create Modal Close
export const contactCreateModalClose = () => {
    return {
        type: contactConstants.CONTACT_CREATE_MODAL_CLOSE,
    }
}
