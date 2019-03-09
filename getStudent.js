module.exports = function () {
    var express = require('express');
    var router = express.Router();
    
    router.get('/', function (req, res, next){
        var context = {};
        res.render('findStudent', context);
    });

    router.post('/', function (req, res, next) {
        var context = {};
        var query1 = "select student.FirstName, student.LastName, house.HouseName, student.GradeLevel, student.familiar from student join house on student.House = house.ID where student.FirstName = ? AND student.LastName = ?";
        
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


    return router;
}();
