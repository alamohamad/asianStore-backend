/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products',function(table){
        table.increments('product_id').primary();
        table.string('product_name');
        table.string('product_type');
        table.string('price');
        table.string('quantity');
        table.integer('category_id').unsigned();
        table.foreign('category_id').references('category_id').inTable('categories');
        



    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
};
