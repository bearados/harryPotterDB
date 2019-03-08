module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        mysql.pool.query("SELECT * FROM student", function (error, results, fields) {
            if (error) {
                next(error);
                return;
            }
            context.stuList = results;
            res.render('addStudent', context);
        });
        
    });

    router.post('/', function (req, res, next) {
        var context = {};
        var query1 = "Insert into student (FirstName, LastName, House, GradeLevel, familiar) values (?, ?, ?, ?, ?)";

        var inserts = [req.body.firstname, req.body.lastname, req.body.house, req.body.gradelevel, null];
        var mysql = req.app.get('mysql');
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.student = result;

            res.redirect('/addstudent');
        });
    });


    return router;
}();