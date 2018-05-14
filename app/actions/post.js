/**
 * Created by Administrateur on 09/03/2018.
 */
 import {browserHistory} from 'react-router';
 import {normalize, schema} from 'normalizr';

 export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
 export const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS";
 export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
 export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
 export const GET_POST_SUCCESS = "GET_POST_SUCCESS";

 export function submitPostForm(userId, content) {
    return (dispatch) => {
        fetch('/post', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: userId,
                content: content
            })
        }).then(function (response) {
            dispatch({
                type: CREATE_POST_SUCCESS
            });
            browserHistory.push('/home');
        });
    }
}

export function addComment(postId, userId, comment) {
    return (dispatch) => {
        fetch('/comment', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                comment: comment
            })
        }).then(function (response) {
            if (response.ok) {
                return response.json().then((json) => {
                    dispatch({
                        type: POST_COMMENT_SUCCESS,
                        comments: json
                    });
                });
            }
        })
    }
}

export function addLike(postId, userId) {
    return (dispatch)=> {
        fetch('/like/' + postId + '/' + userId).then(function (response) {
            if (response.ok) {
                return response.json().then((json)=> {
                    dispatch({
                        type: LIKE_POST_SUCCESS,
                        payload: {
                            postId,
                            json
                        }
                    });
                });
            }
        });
    }
}

export function getAllPosts(userId, searchText = "") {
    return (dispatch) => {
        fetch('/get_posts/' + userId + '?searchText=' + searchText).then(function (response) {
            if (response.ok) {
                return response.json().then((json) => {
                    const myData = json;
                    const com = new schema.Entity('comments');
                    const like = new schema.Entity('likes');
                    const usr = new schema.Entity('users');
                    const posts = new schema.Entity('posts', {
                        user: usr,
                        comments: [com],
                        likes: [like]
                    });
                    const mySchema = {posts: [posts]};
                    const normalizedData = normalize(myData, mySchema);
                    dispatch({
                        type: GET_POSTS_SUCCESS,
                        normalizedData
                    });
                });
            }
        });
    }
}

export function getPostById(postId) {
    return (dispatch) => {
        fetch('/get_post/' + postId).then(function (response) {
            if (response.ok) {
                return response.json().then((json) => {
                    dispatch({
                        type: GET_POST_SUCCESS,
                        post: json.post
                    });
                });
            }
        });
    }
}

export function postFilterer(text) {
    return (dispatch) => {
        dispatch({
            type: 'FILTER_POST',
            text: text
        });
    }
}
