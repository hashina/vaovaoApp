exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('likes', function (table) {
            table.increments();
            table.integer('post_id').references('id').inTable('posts');
            table.integer('comment_id').references('id').inTable('comments');
            table.integer('user_id').references('id').inTable('users');
            table.timestamp('created_at');
        })
    ]);
};

exports.down = function (knex, Promise) {

};
