var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql')
var dbConfig = require('../db/config')

// create json encoder
var urlencodedParser = bodyParser.json();

/* user query */
router.get('/queryUser', function(req, res) {
  // get parameters
  var username = req.query.username;

  // create mysql database client
  var dbClient = mysql.createConnection(dbConfig);

  // connect to database
  dbClient.connect(function (error) {
    if (error) throw error;
  });

  // check username is exist or not
  var query_sql = `SELECT * FROM user WHERE username='${username}'`;
  dbClient.query(query_sql, function (error, results, fields) {
    if (error) throw error;

    var data = {};
    if (results.length !== 0) {
      data = {
        status: true,
        data: results[0]
      };
    } else {
      data = {
        status: false,
        data: null
      };
    }
    res.send(JSON.stringify(data));
  });
});

/* user register */
router.post('/register', urlencodedParser, function(req, res) {
  // get parameters
  var username = req.body.username;
  var password = req.body.password;

  // create mysql database client
  var dbClient = mysql.createConnection(dbConfig);

  // connect to database
  dbClient.connect(function (error) {
    if (error) throw error;
  });

  // insert new user
  var insert_sql = `insert into user(username,password) values('${username}','${password}')`;
  dbClient.query(insert_sql, function (error, results, fields) {
    if (error) throw error;

    var data = {
      status: true,
      data: 'User register successfully'
    };
    res.send(JSON.stringify(data));
  });
});

/* user login */
router.post('/login', urlencodedParser, function(req, res) {
  // get parameters
  console.log(req.body);

  var username = req.body.username;
  var password = req.body.password;

  console.log(username);
  console.log(password);

  // create mysql database client
  var dbClient = mysql.createConnection(dbConfig);

  // connect to database
  dbClient.connect(function (error) {
    if (error) throw error;
  });

  // check username and password
  var query_sql = `SELECT * FROM user WHERE username='${username}'`;
  dbClient.query(query_sql, function (error, results, fields) {
    if (error) throw error;

    var data = {};
    if (results.length !== 0 && results[0].username === username && results[0].password === password) {
      data = {
        status: true,
        data: 'User login successfully'
      };
    } else {
      data = {
        status: false,
        data: 'Username or password is invalid'
      };
    }

    console.log(data);

    res.send(JSON.stringify(data));
  });
});

module.exports = router;
