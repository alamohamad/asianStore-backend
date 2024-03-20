/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex('users_groups').insert([
      { user_id: 1,group_id: 1 },
      { user_id: 2, group_id: 2 },
      { user_id: 3, group_id: 2 },
      { user_id: 4, group_id: 2 },
  
    ])
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex('groups_permissions')
      .whereIn('group_id', [1, 2])
      .whereIn('user_id', [1, 2])
      .del();
    
  };
  