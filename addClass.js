module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getTeachList(res, mysql, context, complete) {
        mysql.pool.query("SELECT ID, FirstName, LastName FROM teacher", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teach = results;
            complete();
        });
    }


    function getClassList(res, mysql, context, complete) {
        mysql.pool.query("SELECT class.Location, class.ClassName, class.ID, class.TextBook, class.Teacher, teacher.LastName FROM class join teacher on class.Teacher = teacher.ID", function (error, results, fields) {
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
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        getTeachList(res, mysql, context, complete);
        getClassList(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('addClass', context);
            }
        }

    });

    router.post('/', function (req, res, next) {
        var query1 = "Insert into class (ClassName, Teacher, Location, TextBook) values (?, ?, ?, ?)";
        console.log(req.body.adviser);
        var inserts = [req.body.classname, req.body.teacher, req.body.location, req.body.textbook];
        var mysql = req.app.get('mysql');
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            res.redirect('/addClass');
        });
    });



    return router;
}();
