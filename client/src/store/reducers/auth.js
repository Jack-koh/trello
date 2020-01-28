import { updateObject } from 'shared/utility';

const initialState = {
    email: null,
    name: null,
    loading: false,
}

const loginStart = (state, action) => {
    return updateObject(state, {
        email: null,
        name: null,
        loading: true,
    })
}

const loginSuccess = (state, action) => {
    return updateObject(state, {
        email: action.email,
        name: action.name,
        loading: false
    })
}

const loginFail = (state, action) => {
    return updateObject(state, {
        email: null,
        name: null,
        loading: false
    })
}

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return {
        email: null,
        name: null,
        loading: false
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCEED': return loginSuccess(state, action.user);
        case 'LOGIN_FAIL': return loginFail();
        case 'LOGIN_START': return loginStart();
        case 'LOGOUT': return logout();
        default: return state;
    }
}

export default reducer;
