var config = require('../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);
var cascadeDelete = require('bookshelf-cascade-delete');

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');
bookshelf.plugin(cascadeDelete);

//knex.migrate.latest();

module.exports = {
    bookshelf: bookshelf,
    knex: knex
};
