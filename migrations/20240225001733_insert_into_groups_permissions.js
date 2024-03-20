/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   
      return knex('groups_permissions').insert([
        { group_id: 1, permission_id: 2 },
        { group_id: 2, permission_id: 1 },
      ]);
   
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex('groups_permissions')
    .whereIn('group_id', [1, 2])
    .whereIn('permission_id', [1, 2])
    .del();
 };
  