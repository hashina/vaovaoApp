const initialState = {
    token: null,
    user: {},
    posts: {}
};

export default function auth(state = initialState, action) {
    if (!state.hydrated) {
        state = Object.assign({}, initialState, state, {hydrated: true});
    }
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'SIGNUP_SUCCESS':
        case 'OAUTH_SUCCESS':
            return {...state, token: action.token, user: action.user};
        case 'LOGOUT_SUCCESS':
            console.log('state after logout ', state);
            return {};
        default:
            return state;
    }
}
