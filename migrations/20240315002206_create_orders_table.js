exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
      table.increments('order_id').primary(); 
      table.integer('user_id').unsigned().references('user_id').inTable('users');
      table.integer('cart_id').unsigned().references('cart_id').inTable('carts'); 
      table.timestamp('order_date').defaultTo(knex.fn.now());
      table.string('address');
      table.decimal('cost', 10, 2); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orders'); 
  };
  