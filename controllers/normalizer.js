/**
 * Created by Administrateur on 19/03/2018.
 */
import {normalize, schema} from 'normalizr';

const user = new schema.Entity('users');

const comment = new schema.Entity('comments', {
    commenter: user
});

const post = new schema.Entity('posts', {
    author: user,
    comments: [comment]
});

export const normalizedData = normalize(originalData, article);