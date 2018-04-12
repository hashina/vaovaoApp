var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
const Bookshelf = require('../config/bookshelf');
const bookshelf = Bookshelf.bookshelf;
const Post = require('../models/User');

const User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,

    allPosts: function () {
        return this.belongsToMany(Post);
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
});

module.exports = User;
