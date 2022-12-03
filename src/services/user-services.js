import axios from 'axios';
import axiosInstance from '../axious-config';

// Login Service
export const userService = {
    login,
    logout
}

function login(userData) {

    // Create Hase Value
    const hash = Buffer.from(`${userData.email}#user:${userData.password}`).toString('base64');
    // Authorization with basic Auth
    const requestOptions = {
        headers: {
            'Authorization': `Basic ${hash}`
        }
    };

    // Get The Token
    return axiosInstance.get('/users/token', requestOptions)
        .then(auth => {
            //console.log(auth)

            const getUserRequestOptions = {
                headers: {
                    'X-Auth-Token': auth.data.sessionId
                },
            };

            // Storage Data of sessions ID and csr Token
            localStorage.setItem("sessionId", auth.data.sessionId)
            // localStorage.setItem("csrfToken", auth.data.csrf.token)

            return axiosInstance.get('/users?page=0&size=1', getUserRequestOptions)
                .then(user => {
                    userData = {}
                    userData = user?.data?.records[0]
                    userData.token = auth.data.sessionId
                    // Local Storage As user
                    localStorage.setItem('user', JSON.stringify(userData));

                    if (user.data.role === 'USER') {
                        return new Promise.reject("User does not have permission to system.")
                    }

                    return userData
                })
        })

}

function logout() {
    localStorage.removeItem("sessionId")
    localStorage.removeItem("csrfToken")
    localStorage.removeItem("user")
    localStorage.removeItem("appSettings")
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["X-Auth-Token"];
    delete axios.defaults.headers.common["X-Xsrf-Token"];
}

