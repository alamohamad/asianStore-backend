exports.up = function(knex) {
    return knex.schema.alterTable('groups_permissions', function(table) {
      table.integer('group_id').unsigned().notNullable().alter();
      
      table.integer('permission_id').unsigned().notNullable().alter();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('groups_permissions', function(table) {
      table.integer('group_id').unsigned().nullable().alter();
      
      table.integer('permission_id').unsigned().nullable().alter();
    });
  };
  