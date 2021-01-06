var express = require('express')
var router = express.Router()
var path = require('path')

/* GET index page. */
router.get('/', function (req, res, next) {
	//Navigates to the views folder
    var join = path.join(__dirname, 'index.html')
	//console.log(__dirname + " *************************** ");
    res.sendFile(join)
	//res.send('index.html')
})

module.exports = router
