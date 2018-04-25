var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Bookshelf = require('../config/bookshelf');
var bookshelf = Bookshelf.bookshelf;
var Post = require('../models/Posts');

var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,

    posts: function () {
        return this.hasMany(Post);
    },

    comments: function () {
        return this.hasMany(Comment);
    },

    initialize: function () {
        this.on('saving', this.hashPassword, this);
    },

    hashPassword: function (model, attrs, options) {
        var password = options.patch ? attrs.password : model.get('password');
        if (!password) {
            return;
        }
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, null, function (err, hash) {
                    if (options.patch) {
                        attrs.password = hash;
                    }
                    model.set('password', hash);
                    resolve();
                });
            });
        });
    },

    comparePassword: function (password, done) {
        var model = this;
        bcrypt.compare(password, model.get('password'), function (err, isMatch) {
            done(err, isMatch);
        });
    },

    hidden: ['password', 'passwordResetToken', 'passwordResetExpires'],

    virtuals: {
        gravatar: function () {
            if (!this.get('email')) {
                return 'https://gravatar.com/avatar/?s=200&d=retro';
            }
            var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
            return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
        }
    }
}, {
    dependents: ['posts', 'comments']
});

var Post = bookshelf.Model.extend({
    tableName: 'posts',
    user: function () {
        return this.belongsTo(User);
    },
    comments: function () {
        return this.hasMany(Comment);
    }
}, {
    dependents: ['comments']
});

const Comment = bookshelf.Model.extend({
    tableName: 'comments',
    posts: function () {
        return this.belongsTo(Post);
    },
    user: function () {
        return this.belongsTo(User);
    }

});

module.exports = {
    user: User,
    post: Post,
    comment: Comment
};


