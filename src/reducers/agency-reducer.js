import { agenciesConstants } from '../constants';

const initialState = {
    agencies: [],
    agencyLoading: true,
}

const agencyReducer = (state = initialState, action) => {

    switch (action.type) {

        // Get All Agencies Request 
        case agenciesConstants.GET_ALL_AGENCIES_REQUEST:
            return {
                ...state,
                agencyLoading: true,
            }

        // Get All Agencies Success 
        case agenciesConstants.GET_AGENCIES_PAGINATE_SUCCESS:
            return {
                agencyLoading: false,
                agencies: action.payload.records,
                totalAgencies: action.payload.totalCount
            }

        // // Get All Agencies Success 
        // case agenciesConstants.GET_ALL_AGENCIES_SUCCESS:
        //     return {
        //         agencyLoading: false,
        //         agencies: action.payload,

        //         candidates: action.payload.records,
        //         totalCandidates: action.payload.totalCount
        //     }

        // Agency Create
        case agenciesConstants.CREATE_AGENCY:
            return {
                agencies: state.agencies,
                success: action.success,
                modal: false
            }

        // Agency Create Failuer
        case agenciesConstants.CREATE_FAILURE:
            return {
                agencies: state.agencies,
                errors: action.errors,
                modal: true
            }

        // Agency Modal Open 
        case agenciesConstants.AGENCY_MODAL_OPEN:
            return {
                agencies: state.agencies,
                modal: true
            }

        // Agency Modal Close 
        case agenciesConstants.AGENCY_MODAL_CLOSE:
            return {
                agencies: state.agencies,
                errors: '',
                modal: false
            }

        // Agency Update 
        case agenciesConstants.AGENCY_EDIT:
            return {
                agencies: state.agencies,
                success: action.payload,
            }

        // Agency Update Failure 
        case agenciesConstants.AGENCY_EDIT_FAILURE:
            return {
                agencies: state.agencies,
                errors: action.errors,
                modal: true
            }

        default:
            return state;
    }
}

export default agencyReducer