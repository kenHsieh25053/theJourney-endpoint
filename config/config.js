require('dotenv').config();

module.exports = {
  'development': {
    'username': process.env.MYSQL_DEV_USER,
    'password': process.env.MYSQL_DEV_PASSWORD,
    'database': process.env.MYSQL_DEV_DB,
    'host': process.env.MYSQL_DEV_HOST,
    'port': process.env.MYSQL_DEV_PORT,
    'dialect': 'mysql'
  },
  'development2': {
    'dialect': 'sqlite'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
};