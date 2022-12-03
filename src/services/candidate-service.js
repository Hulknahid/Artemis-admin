import axiosInstance from '../axious-config';
import authHeader from '../helper/authHeader';

const requestsOption = {
    headers: authHeader()
}

// Candidate Service
export const candidateService = {
    fetchCandidates,
    createCandidate,
    createNote,
    getNotes,
    updateCandidate,
    updateCandidateImage,
    updateCandidateResume,
    fetchCandidatesNoPaginate,
    getLocationSuggestion,

}

// fetch All Candidate
function fetchCandidates(pageNo, pageSize) {

    return axiosInstance.get(`/candidates/search?pageNo=${pageNo}&pageSize=${pageSize}`, requestsOption)
}

// fetch All Candidate
function getNotes(id) {

    return axiosInstance.get(`/candidate-notes?candidateId=${id}`, requestsOption)
}

// fetch All Candidate Without Pagnite
function fetchCandidatesNoPaginate() {

    return axiosInstance.get(`/candidates/search`, requestsOption)
}

// Create Candidate
function createCandidate(data) {

    return axiosInstance.post('/candidates', data, requestsOption)

}
// Create Candidate
function createNote(data, edit, noteId) {


    return edit == true ? axiosInstance.put(`/candidate-notes/${noteId}`, data, requestsOption) : axiosInstance.post('candidate-notes', data, requestsOption)

}

// Update Candidate
function updateCandidate(id, data) {

    return axiosInstance.put(`/candidates/${id}`, data, requestsOption)
}

// Update Candidate Img
function updateCandidateImage(id, data) {

    requestsOption.headers['Content-Type'] = 'multipart/form-data';

    return axiosInstance.put(`/candidates/${id}/picture`, data, requestsOption)

}

// Update Candidate
function updateCandidateResume(id, data) {

    requestsOption.headers['Content-Type'] = 'multipart/form-data';

    return axiosInstance.put(`/candidates/${id}/resume`, data, requestsOption)

}

function getLocationSuggestion(place) {
    let key = 'b1BLdM-4SF4CU-wxnE1YqlqM4K3LW6pFROitof0Uqyk'
    return axiosInstance.get('https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=' + key + '&query=' + place + '&resultType=city&country=usa&&maxresults=200')
}
