/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex('users').insert([
        { user_name:'alaa' ,email:'alamoh282@gmail.com',password:'111111'},
        { user_name:'tala' ,email:'tala@hotmail.com',password:'222222'},
        { user_name:'nagham' ,email:'nagham@hotmail.com',password:'333333'},
        { user_name:'walaa' ,email:'walaa@gmail.com',password:'000000'},

    ])
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex('users')
    .whereIn('user_name', ['alaa','tala','nagham','walaa'])
    .del();
  
};
