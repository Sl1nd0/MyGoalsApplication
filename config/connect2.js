var express = require('express');
var connection1 = express.Router();
const pg = require('pg');


const pool = new pg.Pool({
  user: 'sli',
  host:'127.0.0.1',
  database:'GoalsDB',
  password:'@Sli2354',
  port:'5432'
});
/*
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
*/
let query = "";
	query += " CREATE TABLE accountplanner ";
	query += " (userid serial NOT NULL PRIMARY KEY,  username character varying(255) NOT NULL,";
	query += " usersurname character varying(255) NOT NULL, userbdate date NOT NULL, useremail character varying(255) NOT NULL, ";
	query += " usernumber integer NOT NULL, userpass character varying(255) NOT NULL ); ";

	let query2 = " CREATE TABLE workgoals ";
	query2 += " ( wgoalsid serial NOT NULL, wgoal character varying(100) NOT NULL, ";
	query2 += " wgoaldesc character varying(500) NOT NULL, wgoaldate date NOT NULL, ";
	query2 += "  wbutremove character varying(50), wbutmet character varying(50), wgoalstatus character varying(50) NOT NULL, ";
	query2 += "  userID INTEGER REFERENCES accountplanner(userid) ";
	query2 += " );";

	let query3 =  " CREATE TABLE personalgoals ";
	query3 += " (goalsid serial NOT NULL,  goal character varying(255) NOT NULL, goaldesc character varying(500) NOT NULL,goaldate date NOT NULL, ";
	query3 += " butremove character varying(100) DEFAULT NULL::character varying, butmet character varying(100) DEFAULT NULL::character varying, ";
	query3 += " goalstatus character varying(50), userID INTEGER REFERENCES accountplanner(userid) ); ";

	/*pool.query(
        query3, (err4, qres4) => {
			if (err4) {console.log(err4)
			} else {
			console.log(qres4 + " ****** ");
			}
	});*/


module.exports = pool;