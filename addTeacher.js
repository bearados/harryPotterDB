module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getHouseList(res, mysql, context, complete) {
        mysql.pool.query("SELECT ID, HouseName FROM house", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.house = results;
            complete();
        });
    }

    function getTeachList(res, mysql, context, complete) {
        var query1 = "SELECT teacher.ID, teacher.FirstName, teacher.LastName, house.HouseName FROM teacher left join house on teacher.HeadofHouse = house.ID";
        mysql.pool.query(query1, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teacher = results;
            complete();
        });
    }

    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        getHouseList(res, mysql, context, complete);
        getTeachList(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('addTeacher', context);
            }

        }

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
