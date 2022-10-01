var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql')
var dbConfig = require('../db/config')

// create application/x-www-form-urlencoded encoder
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* user login */
router.post('/login', urlencodedParser, function(req, res) {
    // get parameters
    var username = req.body.username;
    var password = req.body.password;

    // create mysql database client
    var dbClient = mysql.createConnection(dbConfig);

    // connect to database
    dbClient.connect(function (error) {
        if (error) throw error;
    });

    // check username is exist or not
    var query_sql = `SELECT * FROM staff WHERE staff_name='${username}'`;
    dbClient.query(query_sql, function (error, results, fields) {
        if (error) throw error;

        var data = {};
        if (results.length !== 0 && results[0].staff_name === username && results[0].password === password) {
            data = {
                status: true,
                data: 'Staff login successfully'
            };
        } else {
            data = {
                status: false,
                data: 'Username or password is invalid'
            };
        }
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
