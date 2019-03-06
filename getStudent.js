module.exports = function () {
    var express = require('express');
    var router = express.Router();


    router.get('/', function (req, res, next){
        var context = {};
        var mysql = req.app.get('mysql');
        var query = "select * from student";
        mysql.pool.query(query, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.student = result;
            
            res.render('findStudent', context);
        });
    });

    router.post('/findStudent', function (req, res, next) {
        console.log("in post: " + req.body.FirstName);
        var context = {};
        var query1 = "select * from student where FirstName = ? AND LastName = ?";
        var test = "select * from teacher";
        var inserts = [req.body.FirstName, req.body.LastName]
        var mysql = req.app.get('mysql');
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.student = result;

            res.render('findStudent', context);
        });
    });

    router.get('/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        var query1 = "select * from student where ID = ?";
        var inserts = id;
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.student = result;

            res.render('deleteStudent', context);
        });         
        
    });


    return router;
}();
