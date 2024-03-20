const mysql = require('mysql');
function createDatabase() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user1',
    password: '12345',
  });

  connection.connect();

  connection.query('CREATE DATABASE asianstore_ecommerce', (error, results) => {
    if (error) {
      console.error('Error creating database:', error);
    } else {
      console.log('Database created successfully');
    }
    connection.end();
  });
}

createDatabase();

module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'user1',
    password: '12345',
    database: 'asianstore_ecommerce', 
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};
