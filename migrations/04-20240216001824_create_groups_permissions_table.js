/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('groups_permissions',function(table){
        table.increments('group_permission_id').primary();
        table.integer('group_id').unsigned();
        table.integer('permission_id').unsigned();

        // Define foreign keys
        table.foreign('permission_id').references('permission_id').inTable('permissions');




    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('groups_permissions');

};
