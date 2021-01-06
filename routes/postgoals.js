var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var pool = require('../config/connect');

router.get('/API/Checkgoals:ToDo', function(req, res) {

    if  (req.params.ToDo)
    {
    let uid = req.params.ToDo;

    let query4 = "Select * FROM personalgoals ";
        query4 += " WHERE userid = '" + uid + "';";

    let wquery4 = "Select * FROM workgoals ";
        wquery4 += " WHERE userid = '" + uid + "';";

    console.log('B4 Query MAN!!! ' + query4 + ' ****************      ' + wquery4);
    pool.query(
        query4, (err4, qres4) => {
        pool.query(
            wquery4, (err41, qres41) => {
        let personal1 = '';
        let work1 = '';
        console.log('IN  Query MAN!!! ');
        if (qres4.rowCount <= 0 && qres41.rowCount <= 0)
        {
            return res.status(400).send('NOTHING MAN!');
        } else {
            personal1 = qres4;
            work1 = qres41;
            return res.status(200).send({work: work1, personal: personal1});
        }

        });
    });
    } else {
        return res.status(400).send('NOTHING MAN!');
    }
});

router.get('/API/removepersonalGoal:ToDo', function(req, res) {
    if (req.params.ToDo) {
        
        var remData = JSON.parse(req.params.ToDo);
        let query4 = "DELETE FROM personalgoals WHERE goalsid = ";
        query4 += remData.id + " AND goaldesc like '%";
        query4 +=  remData.goaldesc + "%'";
    //console.log(query4);
        pool.query(
            query4, (err4, qres4) => {
            return res.status(200).send('DONE DELETING');
        }); 

    } else {
        return res.status(400).send("Couldn't Delete ");
    }
});

router.get('/API/workRemove:ToDo', function(req, res) {
    if (req.params.ToDo) {
        
        var remData = JSON.parse(req.params.ToDo);
        let query4 = "DELETE FROM workgoals WHERE wgoalsid = ";
        query4 += remData.id + " AND wgoaldesc like '%";
        query4 +=  remData.wgoaldesc + "%'";
    //console.log(query4);
        pool.query(
            query4, (err4, qres4) => {
            if (err4)
            {
                return res.status(400).send("Couldn't Delete ");
            } else {
                return res.status(200).send('DONE DELETING');
            }
        }); 

    } else {
        return res.status(400).send("Couldn't Delete ");
    } 
});

router.get('/API/Setstatus:ToDo', function(req, res) {

    if (req.params.ToDo)
    {
        let updateData = JSON.parse(req.params.ToDo);
        let query4 = "UPDATE personalgoals SET goalstatus = 'MET' WHERE goalsid = ";
            query4 += updateData.id + " AND goaldesc like '%";
            query4 +=  updateData.goaldesc + "%'";
        //console.log(query4);
        pool.query(
            query4, (err4, qres4) => {
        if (err4) {
            return res.status(400).send('Could not Update! ');
            } else {
            return res.status(200).send('DONE Updating ');
        }  
        });

    } else {
        return res.status(400).send('Cant Update! ');
    }   

});

router.get('/API/WorkSet:ToDo', function(req, res) {
   
    if (req.params.ToDo)
    {
        let updateData1 = JSON.parse(req.params.ToDo);

        let query421 = "UPDATE workgoals SET wgoalstatus = 'MET' WHERE wgoalsid = ";
            query421 += updateData1.id + " AND wgoaldesc like '%";
            query421 +=  updateData1.wgoaldesc + "%';";
        //console.log(query4);
        //return res.status(200).send('DONE Updating ');
        pool.query(
            query421, (err421, qres421) => {
            if (err421) {
            return res.status(400).send('Could not Update! ');
            } else {
            return res.status(200).send('DONE Updating ');
            }
        });
       // console.log(query421);
       // return res.status(400).send('Cant Update! ');
    } else {
        return res.status(400).send('Cant Update! ');
    }
});

router.get('/API/postPersonal:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {
       
        let myData = JSON.parse(req.params.ToDo);
        let status = "SET";
        console.log(myData.goalDesc + ' AS DESCRIPTION!! ! ');
        if (!myData.title || !myData.goalDesc || !myData.date) {
           // console.log(myData.title + " - " + myData.goalDesc + " - " + myData.date);
            return res.status(400).send('Enter the full details for a goal');
        }
       // pool.query('Select NOW() as mydate', )
        //"Select to_char(NOW(), 'YYYY-MM-DD HH:MM') as mydate", (err2, qres1) => {
        let query = "INSERT INTO personalgoals(goal, goaldesc, goaldate, goalstatus, userid) ";
        query += " VALUES(";
        query += "'" + myData.title.replace(/\s/g,' ') + "'," + " '" +  myData.goalDesc + "',"  +  "'NOW()', " + "'" + status + "', '";
        query += myData.userid + "');"; 

        console.log(" 111 000 &&& " + '   **** ');
        console.log(query + '   **** ');
        //I insert
        pool.query(
        query , (err1, qres1) => {
        let query2 = "SELECT * FROM personalgoals WHERE goaldesc like '%";
            query2 +=  myData.goalDesc + "%'";    
            pool.query(
                query2 , (err2, qres2) => {
                let id = qres2.rows[qres2.rowCount - 1].goalsid
                //console.log();
                let query3 = "UPDATE personalgoals SET butmet = 'm" + id + "' , butremove = 'r" + id + "' ";
                    query3 += " WHERE goalsid = " + id + ";";  
                    console.log(query3);
                    pool.query(
                        query3 , (err3, qres3) => {
                        let query4 = "Select * FROM personalgoals";
                        pool.query(
                            query4, (err422, qres422) => {
                            return res.status(200).send(qres422);
                            });
                            //
                        });
                    });
            });
        //I insert
        
    } else {
        return res.status(400).send('Enter the full details for a goal');
    }
    
});

router.get('/API/postWork:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {

        let myData = JSON.parse(req.params.ToDo);
        let status = "SET";
        console.log(myData.goalDesc + ' AS DESCRIPTION!! ! ');
        if (!myData.title || !myData.goalDesc || !myData.date) {
           // console.log(myData.title + " - " + myData.goalDesc + " - " + myData.date);
            return res.status(400).send('Enter the full details for a goal');
        }
       // pool.query('Select NOW() as mydate', )
        //"Select to_char(NOW(), 'YYYY-MM-DD HH:MM') as mydate", (err2, qres1) => {
        let query = "INSERT INTO workgoals(wgoal, wgoaldesc, wgoaldate, wgoalstatus, userid) ";
        query += " VALUES(";
        query += "'" + myData.title + "'," + " '" +  myData.goalDesc + "',"  +  "'NOW()', " + "'" + status + "', '";
        query += myData.userid + "');"; 

        ////START ///////
        //I insert
        pool.query(
        query , (err1, qres1) => {
        let query2 = "SELECT * FROM workgoals WHERE wgoaldesc like '%";
            query2 +=  myData.goalDesc + "%'";    
            pool.query(
                query2 , (err2, qres2) => {
                let id = qres2.rows[qres2.rowCount - 1].wgoalsid;
                //console.log();
                let query3 = "UPDATE workgoals SET wbutmet = 'm" + id + "' , wbutremove = 'r" + id + "' ";
                    query3 += " WHERE wgoalsid = " + id + ";";  
                    console.log(query3);
                    pool.query(
                        query3 , (err3, qres3) => {
                        let query4 = "Select * FROM workgoals";
                        pool.query(
                            query4, (err411, qres411) => {
                            return res.status(200).send(qres411);
                            });
                            //
                        });
                    });
            });
        ////END ///////
      // return res.status(200).send(" I'm not a robot work");
    }
});

module.exports = router;
