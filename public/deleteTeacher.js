module.exports = function () {
    var express = require('express');
    var router = express.Router();


    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        mysql.pool.query("SELECT teacher.FirstName, teacher.LastName, house.HouseName FROM teacher left join house on teacher.HeadofHouse = house.ID", function (error, results, fields) {
            if (error) {
                next(error);
                return;
            }
            context.teacher = results;
            res.render('deleteTeacher', context);
        });

    });


    router.get('/:id', function (req, res) {
        var context = {};
        var mysql = req.app.get('mysql');
        var query1 = "delete from teacher where ID = ?";
        var inserts = [req.params.ID];
        console.log(inserts);
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.teacher = result;
            res.redirect('/deleteTeacher');
        });
    });

    return router;
}();

