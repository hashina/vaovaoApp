/**
 * Created by Administrateur on 09/03/2018.
 */
var Post = require('../models/Posts');
var User = require('../models/User');
var Comment = require('../models/Comment');
var Bookshelf = require('../config/bookshelf');
var knex = Bookshelf.knex;

/**
 * POST /post
 */
exports.postPost = function (req, res) {
    new Post({
        content: req.body.content,
        user_id: req.body.userId,
        created_at: new Date()
    }).save().then(function (model) {
        res.redirect('/home');
    });
}

exports.postComment = function (req, res) {
    new Comment({
        content: req.body.comment,
        user_id: req.body.userId,
        post_id: req.body.postId,
        created_at: new Date()
    }).save().then(function (model) {
        res.send({comment: model})
    });
}

/**
 * GET /get_posts 'where', 'content', 'LIKE', '%' + searchText + '%'
 */
exports.getPosts = function (req, res) {
    let searchText = req.query.searchText,
        searchTextSplit = searchText.split(' '),
        clause = "";
    searchTextSplit.forEach(function (item) {
        if (item !== '') {
            clause = clause + ":content: like '%" + item + "%' OR ";
        }
    });
    let lastIndex = clause.lastIndexOf("OR");
    clause = clause.substring(0, lastIndex);
    if (clause) {
        Post.query(function (qb) {
            qb.where(knex.raw(clause, {
                content: 'posts.content'
            })).orderBy('created_at', 'DESC');
        }).fetchAll({
            withRelated: ['user', {
                'comments': function (qb) {
                    qb.orderBy('created_at', 'DESC');
                }
            }]
        }).then(function (row) {
            return res.send({posts: row});
        });
    } else {
        Post.query(function (qb) {
            qb.orderBy('created_at', 'DESC');
        }).fetchAll({
            withRelated: ['user', {
                'comments': function (qb) {
                    qb.orderBy('created_at', 'DESC');
                }
            }]
        }).then(function (posts) {
            return res.send({posts: posts});
        });
    }

}

exports.getPost = function (req, res) {
    Post.query(function (qb) {
        qb.where('id', req.params.postId).orderBy('created_at', 'DESC');
    }).fetch({
        withRelated: ['user', {
            'comments': function (qb) {
                qb.orderBy('created_at', 'DESC');
            }
        }]
    }).then(function (post) {
        return res.send({post: post});
    })
}
