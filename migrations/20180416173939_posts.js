exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('posts', function (table) {
            table.increments();
            table.string('content');
            table.timestamp('created_at');
            table.integer('user_id').references('id').inTable('users');
        })
    ]);
};

exports.down = function (knex, Promise) {

};
