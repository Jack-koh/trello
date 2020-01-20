export const login = (userData) => {
    return {
        type: 'LOGIN',
        user: {
            email: userData.email,
            password: userData.password
        }

    }
}
export const loginSucceed = (user) => {
    return {
        type: 'LOGIN_SUCCEED',
        user: user
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