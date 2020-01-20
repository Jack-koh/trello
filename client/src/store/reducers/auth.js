import { updateObject } from 'shared/utility';

const initialState = {
    token: null,
    userId: null,
    email: null,
    name: null,
    loading: false,
    authRouter: null
}



const loginSucceed = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        email: action.email,
        name: action.name,
        authRouter: 'userName/boards'
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCEED': return loginSucceed(state, action.user);
        default: return state;
    }
}

export default reducer;
