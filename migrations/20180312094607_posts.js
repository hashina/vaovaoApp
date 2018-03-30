exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('posts', function (table) {
            table.increments();
            table.string('content');
            table.integer('user_id').references('id').inTable('users');
        })]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('posts');
};
