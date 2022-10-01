var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql')
var dbConfig = require('../db/config')

// create application/x-www-form-urlencoded encoder
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* create application */
router.post('/create', urlencodedParser, function(req, res) {
    // get parameters
    var username = req.body.username;
    var film_name = req.body.film_name;

    // create mysql database client
    var dbClient = mysql.createConnection(dbConfig);

    // connect to database
    dbClient.connect(function (error) {
        if (error) throw error;
    });

    // create new application
    var insert_sql = `insert into application(username,film_name,status) values('${username}','${film_name}','new')`;
    dbClient.query(insert_sql, function (error, results, fields) {
        if (error) throw error;

        var data = {
            status: true,
            data: 'New application'
        };
        res.send(JSON.stringify(data));
    });
});

/* change application status */
router.get('/changeStatus', function(req, res) {
    // get parameters
    var film_id = req.query.id;
    var new_status = req.query.status;

    // create mysql database client
    var dbClient = mysql.createConnection(dbConfig);

    // connect to database
    dbClient.connect(function (error) {
        if (error) throw error;
    });

    // change application status
    var update_sql = "update application set status='" + new_status + "' where id=" + film_id;
    dbClient.query(update_sql, function (error, results, fields) {
        if (error) throw error;

        var data = {
            status: true,
            data: 'Update application status'
        };
        res.send(JSON.stringify(data));
    });
});

/* query all applications */
router.get('/queryAllApplications', function(req, res) {
    // create mysql database client
    var dbClient = mysql.createConnection(dbConfig);

    // connect to database
    dbClient.connect(function (error) {
        if (error) throw error;
    });

    // check username is exist or not
    var query_sql = `SELECT * FROM application`;
    dbClient.query(query_sql, function (error, results, fields) {
        if (error) throw error;

        var data = {
            status: true,
            data: results
        };
        res.send(JSON.stringify(data));
    });
});

/* query applications by username */
router.get('/queryApplicationsByUsername', function(req, res) {
    // get parameters
    var username = req.query.username;

    // create mysql database client
    var dbClient = mysql.createConnection(dbConfig);

    // connect to database
    dbClient.connect(function (error) {
        if (error) throw error;
    });

    // check username is exist or not
    var query_sql = `SELECT * FROM application WHERE username='${username}'`;
    dbClient.query(query_sql, function (error, results, fields) {
        if (error) throw error;

        var data = {
            status: true,
            data: results
        };
        res.send(JSON.stringify(data));
    });
});

/* query applications by film name */
router.get('/queryApplicationsByFilmName', function(req, res) {
    // get parameters
    var film_name = req.query.film_name;

    // create mysql database client
    var dbClient = mysql.createConnection(dbConfig);

    // connect to database
    dbClient.connect(function (error) {
        if (error) throw error;
    });

    // check username is exist or not
    var query_sql = `SELECT * FROM application WHERE film_name='${film_name}'`;
    dbClient.query(query_sql, function (error, results, fields) {
        if (error) throw error;

        var data = {
            status: true,
            data: results
        };
        res.send(JSON.stringify(data));
    });
});

/* query applications status by id */
router.get('/queryApplicationsStatusById', function(req, res) {
    // get parameters
    var application_id = req.query.application_id;

    // create mysql database client
    var dbClient = mysql.createConnection(dbConfig);

    // connect to database
    dbClient.connect(function (error) {
        if (error) throw error;
    });

    // check username is exist or not
    var query_sql = `SELECT status FROM application WHERE id='${application_id}'`;
    dbClient.query(query_sql, function (error, results, fields) {
        if (error) throw error;

        var data = {
            status: true,
            data: results
        };
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
