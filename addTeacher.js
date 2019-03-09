module.exports = function () {
    var express = require('express');
    var router = express.Router();
    function addteach() {

    }

    function addteachhouse() {

    }

    
    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        mysql.pool.query("SELECT teacher.FirstName, teacher.LastName, house.HouseName FROM teacher left join house on teacher.HeadofHouse = house.ID", function (error, results, fields) {
            if (error) {
                next(error);
                return;
            }
            context.teacher = results;
            res.render('addTeacher', context);
        });

    });

    router.post('/', function (req, res, next) {
        var context = {};
        var query1 = "Insert into teacher (FirstName, LastName, HeadofHouse) values (?, ?, ?)";

        var inserts = [req.body.firstname, req.body.lastname, req.body.house];
        var mysql = req.app.get('mysql');
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.student = result;

            res.redirect('/addTeacher');
        });
    });


    return router;
}();
