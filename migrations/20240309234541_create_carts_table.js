/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('carts', function(table) {
      table.increments('cart_id').primary();
      table.integer('user_id').unsigned().unique().notNullable();
      table.timestamps(true, true);
  
      table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('carts');
  };
  