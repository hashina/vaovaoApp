
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('comments', function(t) {
        t.timestamp('created_at');
    });
};

exports.down = function(knex, Promise) {
  
};
