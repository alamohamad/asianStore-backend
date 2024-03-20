exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
      table.string('phone_number'); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
      table.dropColumn('phone_number'); 
    });
  };
  