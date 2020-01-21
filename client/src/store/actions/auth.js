export const login = (userData) => {
    localStorage.setItem('token', userData.data.token)
    localStorage.setItem('userId', userData.data.userId)
    localStorage.setItem('expiration', userData.data.expiration)
    return {
        type: 'LOGIN',
        user: {
            email: userData.email,
            password: userData.password
        }

    }
}

export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            // logout
        } else {
            const expiration = localStorage.getItem
            const now = new Date().getTime();
            if (now <= expiration) {
                //logout
            } else {
                //logout
            }
        }
    }
}