import { updateObject } from 'shared/utility';

const initialState = {
    token: null,
    userId: null,
    email: null,
    name: null,
    loading: false,
}



const login = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        email: action.email,
        name: action.name,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': return login(state, action.user);
        default: return state;
    }
}

export default reducer;
