/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users_groups',function(table){
        table.increments('user_group_id');
        table.integer('user_id').unsigned();
        table.integer('group_id').unsigned();


        //foreign key
        table.foreign('group_id').references('group_id').inTable('groups');
        table.foreign('user_id').references('user_id').inTable('users');

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users_groups')
};
