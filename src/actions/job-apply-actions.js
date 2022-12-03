import { jobApplyConstants } from '../constants';
import { jobApplyService } from '../services'


// Create New Job 
export const createNewJobApplication = (data) => dispatch => {
    jobApplyService.createNewJobApply(data)
        .then(job => {
            dispatch({
                type: jobApplyConstants.CREATE_JOB_APPLY
            })

            // // Again Fetch The All Data
            // dispatch({
            //     type: jobConstants.GET_ALL_JOB_REQUEST
            // })

            // jobService.fetchJobs()
            //     .then(job => {
            //         dispatch({
            //             type: jobConstants.GET_ALL_JOB_SUCCESS,
            //             payload: job.data.records
            //         })
            //     })
            //     .catch(err => console.log(err.response))

        })
        .catch(err => {
            dispatch({
                type: jobApplyConstants.CREATE_JOB_APPLY_FAILURE,
                errors: err.response.data
            })
        })
}


// Job Create Or Edit Modal Open 
export const jobApplyModalOpen = (id) => {
    return {
        type: jobApplyConstants.JOB_APPLY_MODAL_OPEN,
        jobId: id
    }
}

// Job Create Or Edit Modal Close
export const jobApplyModalClose = () => {
    return {
        type: jobApplyConstants.JOB_APPLY_MODAL_CLOSE,
        jobId: ''
    }
}

// Job Apply List By Job Id Open
export const jobAppyListOpen = (id) => {
    return {
        type: jobApplyConstants.JOB_APPLY_LIST_BY_JOB_ID_OPEN,
        jobId: id
    }
}

// Job Apply List By Job Id Close
export const jobAppyListClose = () => {
    return {
        type: jobApplyConstants.JOB_APPLY_LIST_BY_JOB_ID_CLOSE,
        jobId: ""
    }
}
