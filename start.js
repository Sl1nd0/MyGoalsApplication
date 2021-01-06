var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var connect = require('./config/connect');
//var connection =  require('./config/connect'); //Essential Line FOR DB_connect ...
var app = express();

var index = require('./routes/index.js');
var goalroutes = require('./routes/postgoals.js');
var beginroutes = require('./routes/begin.js'); 
var accountroutes = require('./routes/account.js');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(express.static(path.join(__dirname, 'public'))) // Serve the public folder.
//app.use(express.static(path.join(__dirname, 'public//publicstatic'))) // Serve the static public folder.
app.use(express.static(path.join(__dirname, 'views'))) // Serve the views folder.
console.log(path.join(__dirname, 'public'));

//app.use(beginroutes);
app.use(index); // Set the page router.
app.use(goalroutes);
app.use(accountroutes);

app.set('port', process.env.PORT||3000);
//connection was here
app.listen(app.get('port'), function() {
    //console.log('Server listening on port ' + server.address().port)
    console.log('Express started on http:// local host:' + 
    app.get('port') + 'press C-trl C to terminate!');
}); 

module.exports = app
