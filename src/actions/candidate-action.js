import { candidateConstants, } from '../constants';
import { candidateService } from '../services'


// Get All Candidate
export const getAllCandidatePaginate = (pageNo, pageSize) => dispatch => {
    dispatch({
        type: candidateConstants.GET_ALL_CANDIDATES_REQUEST
    })
    candidateService.fetchCandidates(pageNo, pageSize)
        .then(candidate => {
            dispatch({
                type: candidateConstants.GET_ALL_CANDIDATES_SUCCESS,
                payload: candidate.data,
            })
        })
        .catch(err => console.log(err))

}

// Create Candidate
export const createCandidate = (pageNo, pageSize, data) => dispatch => {
    candidateService.createCandidate(data)
        .then(() => {
            dispatch({
                type: candidateConstants.CREATE_CANDIDATE,
            })

            // Again Featch all data
            dispatch({
                type: candidateConstants.GET_ALL_CANDIDATES_REQUEST
            })
            candidateService.fetchCandidates(pageNo, pageSize)
                .then(candidate => {
                    dispatch({
                        type: candidateConstants.GET_ALL_CANDIDATES_SUCCESS,
                        payload: candidate.data,
                    })
                })
                .catch(err => console.log(err))

        })
        .catch(err => {
            dispatch({
                type: candidateConstants.CREATE_CANDIDATE_FAILURE,
                candidateError: err.response.data,
            })
        })
}



// Update Candidate
export const updateCandidate = (pageNo, pageSize, id, data) => dispatch => {
    candidateService.updateCandidate(id, data)
        .then(() => {
            dispatch({
                type: candidateConstants.UPDATE_CANDIDATE
            })

            // Again Featch all data
            dispatch({
                type: candidateConstants.GET_ALL_CANDIDATES_REQUEST
            })
            candidateService.fetchCandidates(pageNo, pageSize)
                .then(candidate => {
                    dispatch({
                        type: candidateConstants.GET_ALL_CANDIDATES_SUCCESS,
                        payload: candidate.data,
                    })
                })
                .catch(err => console.log(err.response))


        })
        .catch(err => {
            // Update Candidate Failure
            dispatch({
                type: candidateConstants.UPDATE_CANDIDATE_FAILURE,
                candidateError: err.response.data,
            })
        })
}




// Update Candidate Image
export const updateCandidateImage = (pageNo, pageSize, id, data) => dispatch => {
    candidateService.updateCandidateImage(id, data)
        .then(() => {

            dispatch({
                type: candidateConstants.UPDATE_CANDIDATE_IMG
            })

            // Again Featch all data
            candidateService.fetchCandidates(pageNo, pageSize)
                .then(candidate => {
                    dispatch({
                        type: candidateConstants.GET_ALL_CANDIDATES_SUCCESS,
                        payload: candidate.data,
                    })
                })
                .catch(err => console.log(err.response))

        })
        .catch(err => {
            console.log(err.response)
        })
}


// Update Candidate Resume
export const updateCandidateResume = (pageNo, pageSize, id, data) => dispatch => {
    candidateService.updateCandidateResume(id, data)
        .then(() => {

            dispatch({
                type: candidateConstants.UPDATE_CANDIDATE_RESUME
            })

            // Again Featch all data
            candidateService.fetchCandidates(pageNo, pageSize)
                .then(candidate => {
                    dispatch({
                        type: candidateConstants.GET_ALL_CANDIDATES_SUCCESS,
                        payload: candidate.data,
                    })
                })
                .catch(err => console.log(err.response))

        })
        .catch(err => {
            console.log(err.response)
        })
}

// Get All Candidate
export const getAllCandidateNoPaginate = () => dispatch => {
    dispatch({
        type: candidateConstants.GET_ALL_CANDIDATES_REQUEST_NO_PAGINATE
    })
    candidateService.fetchCandidatesNoPaginate()
        .then(candidate => {
            dispatch({
                type: candidateConstants.GET_ALL_CANDIDATES_SUCCESS_NO_PAGINATE,
                allDataNoPaginate: candidate.data.records,
            })
        })
        .catch(err => console.log(err))

}







// Candidate Create Modal Open
export const candidateModalOpen = () => {
    return {
        type: candidateConstants.CANDIDATE_MODAL_OPEN,
    }
}

// Candidate Create Modal Open
export const candidateModalClose = () => {
    return {
        type: candidateConstants.CANDIDATE_MODAL_CLOSE,
    }
}






// Candidate Details Open
export const candidateDetailsIn = () => {
    return {
        type: candidateConstants.CANDIDATE_DETAILS_IN,
    }
}

// Candidate Details Close
export const candidateDetailsOut = () => {
    return {
        type: candidateConstants.CANDIDATE_DETAILS_OUT,
    }
}

// Candidate Resume Open
export const resumeIn = () => {
    return {
        type: candidateConstants.RESUME_IN,
    }
}

// Candidate Resume Close
export const resumeOut = () => {
    return {
        type: candidateConstants.RESUME_OUT,
    }
}
