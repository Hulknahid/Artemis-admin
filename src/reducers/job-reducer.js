import { jobConstants } from '../constants'

const initState = {
    opportunityIn: false,
    jobModal: false,
    jobsWithPaginate: [],
    singleJob: {}
}

const opprtunityReducer = (state = initState, action) => {
    switch (action.type) {

        // All Job Request 
        case jobConstants.GET_ALL_JOB_REQUEST:
            return {
                ...state,
                jobsLoading: true,
            }

        // All Job Success 
        case jobConstants.GET_JOBS_PAGINATE_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                jobsLoading: false,
                jobsWithPaginate: action.payload.records,
                totalJobs: action.payload.totalCount
            }

        // // All Job Success 
        // case jobConstants.GET_ALL_JOB_SUCCESS:
        //     return {
        //         ...state,
        //         jobsLoading: false,
        //         jobs: action.payload,
        //     }

        // Create Job 
        case jobConstants.CREATE_JOB:
            return {
                ...state,
                jobModal: false,
                errors: ''
            }

        // create job Failure 
        case jobConstants.CREATE_JOB_FAILURE:
            return {
                ...state,
                jobModal: true,
                errors: action.errors
            }

        // Update Job 
        case jobConstants.UPDATE_JOB:
            return {
                ...state,
                jobModal: false,
                errors: ''
            }

        // Update job Failure 
        case jobConstants.UPDATE_JOB_FAILURE:
            return {
                ...state,
                jobModal: true,
                errors: action.errors
            }

        // Sinlge Job Request 
        case jobConstants.GET_SINGLE_JOB_REQUEST:
            return {
                ...state,
                jobsLoadingSingle: true
            }

        // Sinlge Job Success
        case jobConstants.GET_SINGLE_JOB_SUCCESS:
            return {
                ...state,
                jobsLoadingSingle: false,
                singleJob: action.singleJob
            }


        case jobConstants.OPPORTUNITIES_IN:
            return {
                ...state,
                opportunityIn: true
            }
        case jobConstants.OPPORTUNITIES_OUT:
            return {
                ...state,
                opportunityIn: false,
                singleJob: {}
            }


        // job create or update modal open 
        case jobConstants.JOB_CREATE_UPDATE_MODAL_OPEN:
            return {
                ...state,
                jobModal: true,
                errors: ''
            }

        // job create or update modal open  
        case jobConstants.JOB_CREATE_UPDATE_MODAL_CLOSE:
            return {
                ...state,
                jobModal: false,
                errors: ''
            }


        case jobConstants.JOB_APPLY_MODAL_OPEN:
            return {
                ...state,
                applyModal: true,
                applyErrors: ''
            }

        case jobConstants.JOB_APPLY_MODAL_CLOSE:
            return {
                ...state,
                applyModal: false,
                applyErrors: ''
            }

        default:
            return state;
    }
}

export default opprtunityReducer;