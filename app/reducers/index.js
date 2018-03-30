import {combineReducers} from 'redux';
import messages from './messages';
import auth from './auth';
import posts from './post';

export default combineReducers({
    messages,
    auth,
    posts
});
