/**
 * Created by Administrateur on 09/03/2018.
 */
 import merge from "lodash/merge";
 import {CREATE_POST_SUCCESS, POST_COMMENT_SUCCESS, LIKE_POST_SUCCESS, GET_POSTS_SUCCESS, GET_POST_SUCCESS} from "../actions/post"

 const initialSate = {
    normalizedData: {}
};

function filterPost(text, posts, state) {
    state = posts.map((id)=> {
        if (state.posts.entities.posts[id].content.indexOf(text) === -1) {
            state.posts.result.posts.splice(id, 1);
        }
        return state;
    });
}

function updatePostsLike(state, action) {
    const {payload} = action;
    const {postId} = payload;
    console.log('post', [...state.normalizedData.entities.likes, {kankana: 'kankana'}]);
    return state;
    //return state.posts.entities.likes[60] = {post_id: 12, user_id: 1};
}

export default function posts(state = {}, action) {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
        return {...state, normalizedData: action.normalizedData};
        case GET_POST_SUCCESS:
        return {...state, post: action.post, comments: action.post.comments};
        case CREATE_POST_SUCCESS:
        return state;
        case 'FILTER_POST':
        state = filterPost(action.text, state.posts.result.posts, state);
        return state;
        case POST_COMMENT_SUCCESS:
        return {...state, 
            comments: [action.comments.comment, ...state.comments]
        };
        case LIKE_POST_SUCCESS:
        return updatePostsLike(state, action);
        /*return Object.assign({}, state, {
         comments: action.like.like
     });*/
        //return merge({}, state, action.entities.posts.byId);
        //return state.posts.entities.likes.concat(action.like);
        default:
        return state;
    }
}