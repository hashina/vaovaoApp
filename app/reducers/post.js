/**
 * Created by Administrateur on 09/03/2018.
 */
const initialState = {
    posts: {}
}

function filterPost(text, posts, state) {
    state = posts.map((id)=> {
        if (state.posts.entities.posts[id].content.indexOf(text) === -1) {
            state.posts.result.posts.splice(id, 1);
        }
        return state;
    });
}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case 'GET_POSTS_SUCCESS':
            return Object.assign({}, state, {
                posts: action.posts
            });
        case 'GET_POST_SUCCESS':
            return Object.assign({}, state, {
                post: action.post
            });
        case 'CREATE_POST_SUCCESS':
            return state;
        case 'FILTER_POST':
            state = filterPost(action.text, state.posts.result.posts, state);
            return state;
        default:
            return state;
    }
}