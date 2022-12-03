import axiosInstance from '../axious-config';
import authHeader from '../helper/authHeader'


const requestsOption = {
    headers: authHeader()
}
// Login Service
export const clientService = {
    fetchClients,
    createClient,
    editClient,
    editClientImg,
    fetchClientsWithPaginate
}


function fetchClientsWithPaginate(pageNo, pageSize) {    
    return axiosInstance.get(`/clients?pageNo=${pageNo}&pageSize=${pageSize}`, requestsOption)
}


function fetchClients() {    
    return axiosInstance.get('/clients/search', requestsOption)
}

// Create Client
function createClient(data) {
    return axiosInstance.post('/clients', data, requestsOption)
}

// Edit Client 
function editClient(data, id) {
    return axiosInstance.put(`/clients/${id}`, data, requestsOption)

}
// Edit Client 
function editClientImg(data, id) {
    requestsOption.headers['Content-Type'] = 'multipart/form-data';

    return axiosInstance.put(`/clients/${id}/picture`, data, requestsOption)

}