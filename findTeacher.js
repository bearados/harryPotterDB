module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res, next) {
        var context = {};
        res.render('findTeacher', context);
    });

    router.post('/', function (req, res, next) {
        var context = {};
        var query1 = "select teacher.FirstName, teacher.LastName, house.HouseName from teacher join house on teacher.HeadofHouse = house.ID where teacher.FirstName = ? OR teacher.LastName = ?";

        var inserts = [req.body.firstname, req.body.lastname];
        var mysql = req.app.get('mysql');
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.teacher = result;

            res.render('findTeacher', context);
        });
    });


    return router;
}();