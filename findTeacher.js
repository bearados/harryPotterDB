module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getTeacherID(id, res, mysql, context, complete) {
        var query1 = "select teacher.ID, teacher.FirstName, teacher.LastName, house.HouseName from teacher join house on teacher.HeadofHouse = house.ID where teacher.ID = ?";
        mysql.pool.query(query1, id, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        context.teacher = results;
        complete();
        });
    }

    function getClassList(id, res, mysql, context, complete) {
        var query1 = "select class.ClassName, class.Location, class.TextBook from class where class.Teacher = ?";
        mysql.pool.query(query1, id, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classList = results;
            complete();
        });
    }

    router.get('/', function (req, res, next) {
        var context = {};
        res.render('findTeacher', context);
    });

    router.post('/', function (req, res, next) {
        var context = {};
        var query1 = "select teacher.ID, teacher.FirstName, teacher.LastName, house.HouseName from teacher left join house on teacher.HeadofHouse = house.ID where teacher.FirstName = ? OR teacher.LastName = ?";

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

    //from find Teacher
    router.get('/:id', function (req, res) {
        var context = {};
        var mysql = req.app.get('mysql');
        var id = req.params.id;
        console.log(id);
        var callbackCount = 0;
        getTeacherID(id, res, mysql, context, complete);
        getClassList(id, res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('findTeacher', context);
            }

        }
    });

    return router;
}();