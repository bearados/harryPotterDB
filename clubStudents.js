module.exports = function () {
    var express = require('express');
    var router = express.Router();



    function addStudtoClub(res, mysql, complete, inserts) {
        var query1 = "Insert into club_enrollment (SID, ClubID) values (?, ?)";
        mysql.pool.query(query1, inserts, function (error, result) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }


    function getClub(res, mysql, complete, context, cid) {
        var query1 = "Select Extracurricular.ClubName, Extracurricular.ClubLocation, Extracurricular.ClubID,  teacher.LastName FROM Extracurricular left join teacher on Extracurricular.ClubAdviser = teacher.ID where Extracurricular.ClubID = ?";
        mysql.pool.query(query1, cid, function (error, result) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.club = result[0];
            complete();
        });
    }

    function getClubStudList(res, mysql, complete, context, cid) {
        console.log(cid);
        var query1 = "select student.ID, student.FirstName, student.LastName, house.HouseName, student.GradeLevel from student join house on student.House = house.ID join club_enrollment on club_enrollment.sid = student.ID join Extracurricular on Extracurricular.ClubID = club_enrollment.ClubID where Extracurricular.ClubID = ?";
        mysql.pool.query(query1, cid, function (error, result) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.stuList = result;
            complete();
        });
    }

    function getClubList(res, mysql, context, complete) {
        mysql.pool.query("SELECT Extracurricular.ClubID, Extracurricular.ClubName, Extracurricular.ClubLocation, teacher.LastName FROM Extracurricular left join teacher on Extracurricular.ClubAdviser = teacher.ID", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.clubList = results;
            complete();
        });
    }

    //from addClub view club list link
    router.get('/:id', function (req, res) {
        var callbackCount = 0;
        var mysql = req.app.get('mysql');
        var context = {};
        getClubStudList(res, mysql, complete, context, req.params.id);
        getClub(res, mysql, complete, context, req.params.id);

        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('clubStudents', context);
            }
        }
    });

    //from club.handlbars view club link
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var mysql = req.app.get('mysql');
        var context = {};
        getClubList(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('clubStudents', context);
            }
        }
    });

    //get called by findStudent page
    router.post('/', function (req, res, next) {
        var cid = req.body.club;
        var callbackCount = 0;
        var context = {};
        console.log(req.body.sid);
        var inserts = [req.body.sid, req.body.club];
        var mysql = req.app.get('mysql');
        addStudtoClub(res, mysql, complete, inserts);
        getClubStudList(res, mysql, complete, context, cid);
        getClub(res, mysql, complete, context, cid);
        getClubList(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 4) {
                res.render('clubStudents', context);
            }
        }
    });


    router.post('/getClub', function (req, res, next) {
        var cid = req.body.club;
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getClubList(res, mysql, context, complete);
        getClubStudList(res, mysql, complete, context, cid);
        getClub(res, mysql, complete, context, cid);
        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('clubStudents', context);
            }
        }
    });



    return router;
}();
