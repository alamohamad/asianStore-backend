/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('categories', function(table) {
      table.integer('img_id').unsigned().nullable(); 
      table.foreign('img_id').references('file_id').inTable('file_manager');

    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('categories', function(table) {
      table.dropForeign('img_id'); 
      table.dropColumn('img_id'); 
    });
  };
  