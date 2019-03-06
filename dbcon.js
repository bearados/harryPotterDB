var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_adamsjes',
  password        : '4931',
  database        : 'cs340_adamsjes'
});

module.exports.pool = pool;
