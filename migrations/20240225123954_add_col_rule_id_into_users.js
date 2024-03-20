/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('users', function(table) {
      table.integer('rule_id').unsigned();
      table.foreign('rule_id').references('rule_id').inTable('rules');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
      table.dropForeign('rule_id');
      table.dropColumn('rule_id');
    });
  };
  