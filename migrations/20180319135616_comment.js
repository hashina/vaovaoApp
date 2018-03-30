exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('comments', function (table) {
            table.increments();
            table.string('content');
            table.integer('post_id').references('id').inTable('posts');
            table.integer('user_id').references('id').inTable('users');
        })]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('comments');
};
