/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cart_items', function(table) {
      table.increments('cart_item_id').primary();
      table.integer('cart_id').unsigned().notNullable();
      table.integer('product_id').unsigned().notNullable();
      table.integer('quantity').unsigned().notNullable();
      table.timestamps(true, true);
  
      table.foreign('cart_id').references('cart_id').inTable('carts').onDelete('CASCADE');
      table.foreign('product_id').references('product_id').inTable('products').onDelete('CASCADE');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('cart_items');
  };
  