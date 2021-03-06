module.exports = function () {
    var express = require('express');
    var router = express.Router();


    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        mysql.pool.query("SELECT student.ID, student.FirstName, student.LastName, house.HouseName, student.GradeLevel, student.familiar FROM student join house on house.ID = student.House", function (error, results, fields) {
            if (error) {
                next(error);
                return;
            }
            context.stuList = results;
            res.render('deleteStudent', context);
        });
        
    });


    router.get('/:id', function (req, res) {
        
        var mysql = req.app.get('mysql');
        console.log(req.params.id);
        var query1 = "delete from student where ID = ?";
        var inserts = [req.params.id];
        console.log(inserts);
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                console.log(err);
                return;
            }
            res.redirect('/deleteStudent');
        });
    });

    return router;
}();
