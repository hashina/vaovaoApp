/**
 * Created by Administrateur on 19/03/2018.
 */
var bookshelf = require('../config/bookshelf');
var Post = require('../models/Posts');
var User = require('./User');

const Comment = bookshelf.Model.extend({
    tableName: 'comments',
    posts: function () {
        return this.belongsTo(Post);
    },
    user: function () {
        return this.belongsTo(User);
    }

});

module.exports = Comment;