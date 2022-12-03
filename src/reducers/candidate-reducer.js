import { candidateConstants } from '../constants';

const initialState = {
    candidateModal: false,
    candidates: [],
    candidateDetails: false,
    candidatesNoPaginate: []
}

const candidateReducer = (state = initialState, action) => {

    switch (action.type) {

        // Get All Contacts
        case candidateConstants.GET_ALL_CANDIDATES_REQUEST:
            return {
                ...state,
                candidateLoading: true,
            }

        // Get Candidates Success 
        case candidateConstants.GET_ALL_CANDIDATES_SUCCESS:
            return {
                ...state,
                candidateLoading: false,
                candidates: action.payload.records,
                totalCandidates: action.payload.totalCount
            }

        // Create Candidate
        case candidateConstants.CREATE_CANDIDATE:
            return {
                ...state,
                candidateModal: false,
            }

        // Create Candidate Failure
        case candidateConstants.CREATE_CANDIDATE_FAILURE:
            return {
                ...state,
                candidateModal: true,
                candidateError: action.candidateError
            }

        // Updated Candidate
        case candidateConstants.UPDATE_CANDIDATE:
            return {
                ...state,
                candidateModal: false,
            }

        // Updated Candidate Failure
        case candidateConstants.UPDATE_CANDIDATE_FAILURE:
            return {
                ...state,
                candidateModal: true,
                candidateError: action.candidateError
            }

        // Updated Candidate Image
        case candidateConstants.UPDATE_CANDIDATE_IMG:
            return {
                ...state,
                candidateLoading: false,
            }

        // Updated Candidate Resume
        case candidateConstants.UPDATE_CANDIDATE_RESUME:
            return {
                ...state,
                candidateLoading: false,
            }

        // Candidate Modal Open
        case candidateConstants.CANDIDATE_MODAL_OPEN:
            return {
                ...state,
                candidateModal: true,
                candidateError: ''

            }

        // Candidate Modal Close
        case candidateConstants.CANDIDATE_MODAL_CLOSE:
            return {
                ...state,
                candidateModal: false,
                contacts: state.contacts,
                candidateError: ''
            }

        // Candidate Details Open
        case candidateConstants.CANDIDATE_DETAILS_IN:
            return {
                ...state,
                candidateDetails: true,
            }

        // Candidate Details Open
        case candidateConstants.CANDIDATE_DETAILS_OUT:
            return {
                ...state,
                candidateDetails: false,
            }

        // Candidate Details Open
        case candidateConstants.RESUME_IN:
            return {
                ...state,
                resumeIn: true,
            }

        // Candidate Details Open
        case candidateConstants.RESUME_OUT:
            return {
                ...state,
                resumeIn: false,
            }
        // Candidate Request No Paginate
        case candidateConstants.GET_ALL_CANDIDATES_REQUEST_NO_PAGINATE:
            return {
                ...state,
                candidateNoPaginateLoading: false,
            }
        // Candidate Success No Paginate
        case candidateConstants.GET_ALL_CANDIDATES_SUCCESS_NO_PAGINATE:
            return {
                ...state,
                candidateNoPaginateLoading: true,
                candidatesNoPaginate: action.allDataNoPaginate
            }

        default:
            return state;
    }
}

export default candidateReducer;