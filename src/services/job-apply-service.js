import axiosInstance from '../axious-config';
import authHeader from '../helper/authHeader';


const requestsOption = {
    headers: authHeader()
}

// Agency Service
export const jobApplyService = {
    createNewJobApply
}

function createNewJobApply(data) {
    return axiosInstance.post('/candidate-applications', data, requestsOption)
}