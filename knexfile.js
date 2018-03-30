var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  client: 'mysql',
  connection: process.env.DATABASE_URL || {
    host: "localhost",
    user: "root",
    password: "",
    database: "mega"
  }
};
