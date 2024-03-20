/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex('rules').insert([
        {rule_name:'admin'},
        {rule_name:'employee'},
        {rule_name:'customer'}

    ])
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex('rules')
    .whereIn('rule_name', ['admin','employee','customer'])
    
    .del();
  
};
