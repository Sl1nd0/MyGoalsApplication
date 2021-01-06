var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var pool = require('../config/connect');
var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(cookieParser());
//app.use(express.session({ secret: 'something', store: store }));
var sess = { secret: 'kdshhdouawei9', cookie: {maxAge: 600000}};

if (router.get('env') === 'production') {
    router.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
   
  router.use(session(sess));

router.get('/API/CreateAccount:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {
        let myData = JSON.parse(req.params.ToDo);
        let message = '';

        let query4 = "INSERT INTO ACCOUNTPLANNER(username, usersurname, userbdate, useremail, usernumber, userpass) VALUES (";
        query4 += "'" + myData.name + "' , '" + myData.surname + "' , '" + myData.birthdate + "' , '" + myData.email + "' , '" + myData.number;
        query4 += "' , '" + myData.password + "')"; 

        let queryValidate = "SELECT * FROM ACCOUNTPLANNER";
        
        console.log(query4 + ' AS Query');
        pool.query(
            queryValidate, (err1, qres1) => {
                if (qres1) {
                    for (var i = 0; i < qres1.rowCount; i++)
                    {
                        if (myData.email.trim() == qres1.rows[i].useremail.trim())
                        {
                            message = "Email already belongs to someone else please choose another email";
                            return res.status(400).send(message);
                        }
                    }
                }

             pool.query(
                    query4, (err4, qres4) => {
                    if (err4)
                    {
                        return res.status(400).send('Could not create account');
                    } else {
                        return res.status(200).send('Account created successfully');
                    }
                });
            });
            
    } else {
        return res.status(400).send('Nothing entered in fields, please re-enter');
    }
});

router.get('/getLoginAccount', function(req, res) {
    if (!sess.user) {
        res.status(400).send('Log in to account first');
    } else {
        console.log(sess.user + ' ##### ');
        res.status(200).send({username: sess.user, code: sess.code});
    }
})

router.get('/API/loginAccount:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {
        let myData = JSON.parse(req.params.ToDo); 
        let queryLogin = "SELECT * FROM ACCOUNTPLANNER";
        let found = 0;
        let username = '';
        let userid = '';
        
        var Token = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;

        if (Token.substr(0, 7) == "::ffff:")
        {
                Token = Token.substr(7)
        }

        console.log(Token + ' As IP ' +   req.session.user);

        console.log(' 1 ' + myData.userpassword + ' 2 ' + myData.useremail);
        if (!myData.userpassword || !myData.useremail)
        {
            return res.status(400).send('Please enter all details');
        }

        pool.query(
            queryLogin, (err, qres) => {
                for (var i = 0; i < qres.rowCount; i++)
                {	
                    if (myData.useremail.trim() == qres.rows[i].useremail.trim() && myData.userpassword.trim() == qres.rows[i].userpass.trim())
                    {
                        found = 1;
                        username = qres.rows[i].username;
                        userid = qres.rows[i].userid;
                    }
                }

                if (err) {
                    return res.status(400).send('Could not log in to account');
                } else {
                    if (found == 1)
                    { 
                        //var sses = req.session.user;
                        sess.user = username;
                        sess.code = '00';
                        //req.session.id = userid;
                       

                        console.log('Success!' + sess.user + ' ** ');
                        return res.status(200).send({user: sess.user, login:'00', userid: userid});
                    } else {
                        return res.status(400).send({user: 'User not found, please ensure that all details are correct', login: '01'});
                        //return res.status(200).send('User not found, please ensure that all details are correct');
                    }   
                }
        });

    } else {
        return res.status(400).send('Please Enter full login details');
    }
});

module.exports = router;