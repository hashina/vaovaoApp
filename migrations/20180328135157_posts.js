
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('posts', function(t) {
        t.date('date');
    });
};

exports.down = function(knex, Promise) {
  
};
