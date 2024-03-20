/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex('permissions').insert([
      { code: 'manage_product', display_name: 'Manage Product' },
      { code: 'manage_users', display_name: 'Manage Users' },

    ]);
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.down = function(knex) {
    return knex('permissions')
    .whereIn('code', ['manage_product','manage_users'])
    .del();

};
