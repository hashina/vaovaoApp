
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('posts', function(t) {
        t.timestamp('created_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('posts', function(t) {
        t.dropColumns('date');
    });
};
