var dotenv = require('dotenv');

dotenv.load();

const DB_URL = "postgres://arvvhieuhtyhaa:5b2221b0272b3cda7bee5e1811cc58de6aa82043cb7e13cb3f88818ed9696986@ec2-54-235-193-34.compute-1.amazonaws.com:5432/d78046n8lor341?ssl=true";

/*
module.exports = {
    client: 'pg',
    connection: DB_URL
};
*/

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: "localhost",
        user: "postgres",
        password: "rochel1992",
        database: "mega"
    },
    pool: {min: 1, max: 1000},
    acquireConnectionTimeout: 10000
};

/*module.exports = {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: "localhost",
        user: "root",
        password: "",
        database: "mega"
    }
};*/
