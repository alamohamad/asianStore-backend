// migration_file_name.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex('users')
      .where('user_id', 1)
      .update('rule_id', 1) // Set the rule_id value to 1 for the first user (the first user is the admin)
  
      // Set the rule_id value to 2 for the second, third, and fourth users (employees)
      .then(() => knex('users').whereIn('user_id', [2, 3, 4]).update('rule_id', 2));
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex('users').update('rule_id', null);

   
  };
  