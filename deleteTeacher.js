module.exports = function () {
    var express = require('express');
    var router = express.Router();


    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        mysql.pool.query("SELECT teacher.ID, teacher.FirstName, teacher.LastName, house.HouseName FROM teacher left join house on teacher.HeadofHouse = house.ID", function (error, results, fields) {
            if (error) {
                next(error);
                return;
            }
            context.teacher = results;
            res.render('deleteTeacher', context);
        });

    });


    router.get('/:id', function (req, res) {

        var mysql = req.app.get('mysql');
        console.log(req.params.id);
        var query1 = "delete from teacher where ID = ?";
        var inserts = [req.params.id];
        console.log(inserts);
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                console.log(err);
                return;
            }
            res.redirect('/deleteTeacher');
        });
    });

    return router;
}();

