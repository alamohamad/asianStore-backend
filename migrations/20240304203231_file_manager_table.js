/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('file_manager',function(table){
        table.increments('file_id').primary();
        table.string('old_name');
        table.string('new_name');
        table.string('folder_name');
        table.string('path');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('file_manager');
  
};
