/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex('groups').insert([
    { group_name: 'admin'},
    { group_name: 'data entry'},

  ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex('groups')
    .whereIn('group_name', ['admin','data entry'])
    .del();
};
