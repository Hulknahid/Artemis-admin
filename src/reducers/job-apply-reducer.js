import { jobApplyConstants } from '../constants'

const initState = {
    jobApplyModal: false,
    jobId: '',
    jobApplylistByjobId: false
}

const jobApplyReducer = (state = initState, action) => {
    switch (action.type) {

        // Job Apply Modal Open 
        case jobApplyConstants.CREATE_JOB_APPLY:
            return {
                ...state,
                jobApplyModal: false,
            }
        // Job Apply Modal Open 
        case jobApplyConstants.JOB_APPLY_MODAL_OPEN:
            return {
                ...state,
                jobApplyModal: true,
                jobId: action.jobId
            }

        // Job Apply Modal Close
        case jobApplyConstants.JOB_APPLY_MODAL_CLOSE:
            return {
                ...state,
                jobApplyModal: false,
                jobId: ''
            }
        // Job Apply Modal Open 
        case jobApplyConstants.JOB_APPLY_LIST_BY_JOB_ID_OPEN:
            return {
                ...state,
                jobApplylist: true,
                jobId: action.jobId
            }
        case jobApplyConstants.JOB_APPLY_LIST_BY_JOB_ID_CLOSE:
            return {
                ...state,
                jobApplylist: false,
                jobId: ''
            }

        default:
            return state;
    }
}

export default jobApplyReducer;