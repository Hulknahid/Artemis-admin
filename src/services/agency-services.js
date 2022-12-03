import axiosInstance from '../axious-config';
import authHeader from '../helper/authHeader'

const requestOptions = {
    headers: authHeader()
}


// Agency Service
export const agencyService = {
    fetchAgenciesWithPaginate,
    createAgency,
    editAgency,
    editAgencyImg
}


function fetchAgenciesWithPaginate(pageNo, pageSize) {
    return axiosInstance.get(`/agencies/search?pageNo=${pageNo}&pageSize=${pageSize}`, requestOptions)
}
// function fetchAgencies() {
//     const requestsOption = {
//         headers: authHeader()
//     }
//     return axiosInstance.get('/agencies/search', requestsOption)
// }

// Create Agency 
function createAgency(data) {
    return axiosInstance.post('/agencies', data, requestOptions)

}

// Edit Agency 
function editAgency(data, id) {
    
    return axiosInstance.put(`/agencies/${id}`, data, requestOptions)

}
// Edit Agency 
function editAgencyImg(data, id) {
    requestOptions.headers['Content-Type'] = 'multipart/form-data';

    return axiosInstance.put(`/agencies/${id}/picture`, data, requestOptions)

}