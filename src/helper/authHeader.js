// Auth Header 
const authHeader = () => {
    // Get the data from localStorage sessionId & csrfToken 
    const sessionId = localStorage.getItem('sessionId')
    // const csrfToken = localStorage.getItem('csrfToken')

    if (sessionId) {
        return {
            'X-Auth-Token': sessionId,
            // 'X-Xsrf-Token': csrfToken,
        }
    } else {
        return {}
    }
}

export default authHeader;