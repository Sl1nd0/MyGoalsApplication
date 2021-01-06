var express = require('express');
var connection1 = express.Router();
/*const pg = require('pg');


const pool = new pg.Pool({
  user: 'sli',
  host:'127.0.0.1',
  database:'GoalsDB',
  password:'@Sli2354',
  port:'5432'
});*/

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
 });

pool.connect(function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log(' Successfully Connected to Database');
    }
});

	/*pool.query(
		query3, (err4, qres4) => {
			if (err4) {
				console.log(err4)
			} else {
			console.log(qres4 + " ****** ");
			}
	});*/

module.exports = pool;