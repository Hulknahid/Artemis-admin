import axiosInstance from '../axious-config';
import authHeader from '../helper/authHeader';

const requestsOption = {
    headers: authHeader()
}

// Agency Service
export const jobService = {
    fetchJobsWithPaginage,
    createNewJob,
    updateJob,
    fetchSingleJobs
}

function fetchJobsWithPaginage(pageNo, pageSize) {
    return axiosInstance.get(`/jobs/search?pageNo=${pageNo}&pageSize=${pageSize}`, requestsOption)
}

function createNewJob(data) {
    return axiosInstance.post('/jobs', data, requestsOption)

}

function updateJob(id, data) {
    return axiosInstance.put(`/jobs/${id}`, data, requestsOption)

}


function fetchSingleJobs(id) {
    return axiosInstance.get(`/jobs/${id}`, requestsOption)
}
