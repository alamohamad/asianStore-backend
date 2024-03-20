exports.up = function(knex) {
    return knex.schema.table('users_groups', function(table) {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.user_id').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users_groups', function(table) {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.user_id');
    });
  };
  