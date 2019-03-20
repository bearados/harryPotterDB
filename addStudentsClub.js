
module.exports = function () {
    var express = require('express');
    var router = express.Router();


    function getStudList(res, mysql, context, complete) {
        mysql.pool.query("SELECT student.ID, student.FirstName, student.LastName, house.HouseName, student.GradeLevel, FROM student join house on student.House = house.ID", function (error, results, fields) {
            if (error) {
                next(error);
                return;
            }
            context.stuList = results;
            complete();
        });
    }

    function getClubList(res, mysql, context, complete) {
        mysql.pool.query("SELECT Extracurricular.ClubID, Extracurricular.ClubName from Extracurricular", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clubList = results;
            complete();
        });
    }

    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        getClubList(res, mysql, context, complete);
        getStudList(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('addStudentClub', context);
            }

        }

    });

    router.post('/', function (req, res, next) {
        var context = {};
        var query1 = "Insert into student (FirstName, LastName, House, GradeLevel, familiar) values (?, ?, ?, ?, ?)";
        console.log(req.body.house);
        var houseStr = JSON.stringify(req.body.house);
        console.log(houseStr);
        var inserts = [req.body.firstname, req.body.lastname, req.body.house, req.body.gradelevel, req.body.familiar];
        var mysql = req.app.get('mysql');
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.student = result;
            res.redirect('/addstudent');
        });
    });


    return router;
}();