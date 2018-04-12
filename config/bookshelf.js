var config = require('../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');

knex.schema.table('posts', function (table) {
    table.date("date");
});

//knex.migrate.latest();

module.exports = {
    bookshelf: bookshelf,
    knex: knex
};
