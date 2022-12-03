import axiosInstance from '../axious-config';
import authHeader from '../helper/authHeader';

// Header Request 
const requestsOption = {
    headers: authHeader()
}

// Login Service
export const contactService = {
    // createContact,
    fetchContactsById,
    // updateContact,
    // updateContactImg,
    fetchAllAgencyContact
}


// function createContact(route, data) {

//     let contactRoute = ''
//     if (route === 'agencies') {
//         contactRoute = 'agency-contacts'
//     } else if (route === 'clients') {
//         contactRoute = 'client-contacts'
//     }


//     const requestsOption = {
//         headers: authHeader()
//     }
//     return axiosInstance.post(`/${contactRoute}`, data, requestsOption)
// }


// Fetch Cotacts By Id
function fetchContactsById(route, profileId) {

    let contactRoute = ''
    if (route === 'agencies') {
        contactRoute = 'agency-contacts/agency/'
    } else if (route === 'clients') {
        contactRoute = 'client-contacts/client/'
    }

    
    return axiosInstance.get(`/${contactRoute}${profileId}`, requestsOption)
}

// // Update contact 
// function updateContact(id, route, data) {

//     let contactRoute = '';
//     if (route === 'agencies') {
//         contactRoute = 'agency-contacts'
//     } else if (route === 'clients') {
//         contactRoute = 'client-contacts'
//     }

//     const requestsOption = {
//         headers: authHeader()
//     }
//     return axiosInstance.put(`/${contactRoute}/${id}`, data, requestsOption)
// }


// Update Image of contact 
function updateContactImg(route, contactId, data) {

    let contactRoute = '';
    if (route === 'agencies') {
        contactRoute = 'agency-contacts'
    } else if (route === 'clients') {
        contactRoute = 'client-contacts'
    }
    const requestsOption = {
        headers: authHeader()
    }
    requestsOption.headers['Content-Type'] = 'multipart/form-data';

    return axiosInstance.put(`/${contactRoute}/${contactId}/picture`, data, requestsOption)

}

// All Agency Contact Featch requestsOption
function fetchAllAgencyContact() {
    // Header Request 
    const requestsOption = {
        headers: authHeader()
    }
    return axiosInstance.get('/agency-contacts/search', requestsOption)
}