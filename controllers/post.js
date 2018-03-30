/**
 * Created by Administrateur on 09/03/2018.
 */
var Post = require('../models/Posts');
var User = require('../models/User');
var Comment = require('../models/Comment');
var Knex = require('knex');

/**
 * POST /post
 */
exports.postPost = function (req, res) {
    new Post({
        content: req.body.content,
        user_id: req.body.userId,
        created_at: new Date()
    }).save().then(function (model) {
        console.log('modele', model);
        res.redirect('/home');
    });
}

exports.postComment = function (req, res) {
    new Comment({
        content: req.body.comment,
        user_id: req.body.userId,
        post_id: req.body.postId
    }).save().then(function (model) {
        res.send({comment: model})
    });
}

/**
 * GET /get_posts 'where', 'content', 'LIKE', '%' + searchText + '%'
 */
exports.getPosts = function (req, res) {
    let searchText = req.query.searchText;
    if (searchText) {
        Post.query(function (qb) {
            qb.where('content', 'LIKE', '%' + searchText + '%').orderBy('created_at', 'DESC');
        }).fetchAll({withRelated: ['user', 'comments']}).then(function (posts) {
            return res.send({posts: posts});
        });
    } else {
        Post.query(function (qb) {
            qb.orderBy('created_at', 'DESC');
        }).fetchAll({withRelated: ['user', 'comments']}).then(function (posts) {
            return res.send({posts: posts});
        });
    }

}

exports.getPost = function (req, res) {
    Post.where('id', req.params.postId).fetch().then(function (post) {
        return res.send({post: post});
    })
}
