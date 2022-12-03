import { contactConstants } from '../constants';

const initialState = {
    profileId: {},
    contacts: [],
    createContactModal: false
}

const contactReducer = (state = initialState, action) => {

    switch (action.type) {

        // Profile Router and ID
        case contactConstants.GET_PRPFILE_ROUTE_ID:
            return {
                ...state,
                profileId: {
                    id: action.id,
                    route: action.route
                }
            }

        // Get Contact by Client or agency 
        case contactConstants.GET_ALL_CONTACT_BY_ID_REQUEST:
            return {
                ...state,
                contactLoading: true,
            }

        // Get Contact Success by Client or agency 
        case contactConstants.GET_ALL_CONTACT_BY_ID_SUCCESS:
            return {
                ...state,
                contactLoading: false,
                contacts: action.payload
            }

        // All Contacs Request
        case contactConstants.GET_ALL_AGENCY_CONTACT_REQUEST:
            return {
                ...state,
                agencyContactLoading: true,
            }

        // All Contacts Success
        case contactConstants.GET_ALL_AGENCY_CONTACT_SUCCESS:
            return {
                ...state,
                agencyContactLoading: false,
                allAgencyContacts: action.allAgencyContacts
            }

        // Create Contact by Client or Agency
        case contactConstants.CREATE_CONTACT_FAILURE:
            return {
                ...state,
                createContactModal: true,
                contactError: action.contactError
            }

        // Failuer Contact by Client or Agency
        case contactConstants.UPDATE_CONTACT_FAILURE:
            return {
                ...state,
                createContactModal: true,
                contactError: action.contactError
            }

        // Contact Create modal Open
        case contactConstants.CONTACT_CREATE_MODAL_OPEN:
            return {
                ...state,
                createContactModal: true,
                contacts: state.contacts

            }

        // Contact Create modal Close
        case contactConstants.CONTACT_CREATE_MODAL_CLOSE:
            return {
                ...state,
                createContactModal: false,
                contacts: state.contacts,
                contactError: ''
            }

        default:
            return state;
    }
}

export default contactReducer