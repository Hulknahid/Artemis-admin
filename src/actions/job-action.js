import { jobConstants, appointmentConstants } from '../constants'
import { jobService } from '../services'



// Fetch All Data 
export const getJobsWithPaginate = (pageNo, pageSize) => dispatch => {

    dispatch({
        type: jobConstants.GET_ALL_JOB_REQUEST
    })

    jobService.fetchJobsWithPaginage(pageNo, pageSize)
        .then(job => {
            dispatch({
                type: jobConstants.GET_JOBS_PAGINATE_SUCCESS,
                payload: job.data
            })
        })
        .catch(err => console.log(err.response))
}





// // Fetch All Data 
// export const getJobs = () => dispatch => {

//     dispatch({
//         type: jobConstants.GET_ALL_JOB_REQUEST
//     })

//     jobService.fetchJobs()
//         .then(job => {
//             dispatch({
//                 type: jobConstants.GET_ALL_JOB_SUCCESS,
//                 payload: job.data.records
//             })
//         })
//         .catch(err => console.log(err.response))
// }


// Create New Job 
export const createNewJob = (data) => dispatch => {
    jobService.createNewJob(data)
        .then(job => {
            dispatch({
                type: jobConstants.CREATE_JOB
            })

            // Again Fetch The All Data
            dispatch({
                type: jobConstants.GET_ALL_JOB_REQUEST
            })

            jobService.fetchJobs()
                .then(job => {
                    dispatch({
                        type: jobConstants.GET_ALL_JOB_SUCCESS,
                        payload: job.data.records
                    })
                })
                .catch(err => console.log(err.response))

        })
        .catch(err => {
            dispatch({
                type: jobConstants.CREATE_JOB_FAILURE,
                errors: err.response.data
            })
        })
}

// Update Job 
export const updateJob = (id, data) => dispatch => {

    jobService.updateJob(id, data)
        .then(job => {
            dispatch({
                type: jobConstants.UPDATE_JOB
            })


            // Again Fetch The All Data
            dispatch({
                type: jobConstants.GET_ALL_JOB_REQUEST
            })

            jobService.fetchJobs()
                .then(job => {
                    dispatch({
                        type: jobConstants.GET_ALL_JOB_SUCCESS,
                        payload: job.data.records
                    })
                })
                .catch(err => console.log(err.response))

        })
        .catch(err => {
            dispatch({
                type: jobConstants.UPDATE_JOB_FAILURE,
                errors: err.response.data
            })
        })
}

// Get Single Job 
export const getSingleJob = (id) => dispatch => {
    dispatch({
        type: jobConstants.GET_SINGLE_JOB_REQUEST
    })

    jobService.fetchSingleJobs(id)
        .then(job => {
            dispatch({
                type: jobConstants.GET_SINGLE_JOB_SUCCESS,
                singleJob: job.data
            })
        })
        .catch(err => console.log(err.response))
}

// Job Create Or Edit Modal Open 
export const jobCreateOrEditModalOpen = () => {
    return {
        type: jobConstants.JOB_CREATE_UPDATE_MODAL_OPEN
    }
}

// Job Create Or Edit Modal Close
export const jobCreateOrEditModalClose = () => {
    return {
        type: jobConstants.JOB_CREATE_UPDATE_MODAL_CLOSE
    }
}

export const opportuniesVisible = () => {
    return {
        type: jobConstants.OPPORTUNITIES_IN
    }
}
export const opportuniesInvisible = () => {
    return {
        type: jobConstants.OPPORTUNITIES_OUT
    }
}
export const appointmentName = (data) => dispatch => {
    dispatch({
        type: appointmentConstants.APPOINTMENT_NAME,
        payload: data
    })

}
export const appointmentTime = (start, end) => dispatch => {
    dispatch({
        type: appointmentConstants.APPOINTMENT_ADD_TIME,
        start: start,
        end: end
    })

}