module.exports = function () {
    var express = require('express');
    var router = express.Router();
    
    /*function delPerson(res, mysql, context, id, complete) {
        var sql = "SELECT * FROM student WHERE ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }*/


    router.get('/', function (req, res, next){
        var context = {};
        //var mysql = req.app.get('mysql');
        //var query = "select * from student";
        
        res.render('findStudent', context);
    });

    router.post('/', function (req, res, next) {
        console.log("in post: " + req.body.FirstName);
        var context = {};
        var query1 = "select * from student where FirstName = ? AND LastName = ?";
        var test = "select * from teacher";
        var inserts = [req.body.firstname, req.body.lastname];
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
