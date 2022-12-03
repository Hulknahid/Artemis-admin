import axiosInstance from '../axious-config';
import authHeader from '../helper/authHeader'

const requestsOption = {
    headers: authHeader()
}
// Profile Service
export const profileService = {
    fetchSingleProfile,
    // fetchProfileContacts
}

// Single Profile data 
function fetchSingleProfile(route, id) {
    // const requestsOption = {
    //     headers: authHeader()
    // }
    return axiosInstance.get(`/${route}/${id}`, requestsOption)
}

// // Single Profile data
// function fetchProfileContacts(route, id) {

//     console.log(route);

//     let contactRoute = ''
//     // if (route === 'agencies') {
//     //     contactRoute = 'agency-contacts?agencyId='
//     // } else if (route === 'clients') {
//     //     contactRoute = 'client-contacts?clientId='
//     // }

//     // // Header Request
//     // const requestsOption = {
//     //     headers: authHeader()
//     // }
//     return axiosInstance.get(`/${contactRoute}${id}`)
// }