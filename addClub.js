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



    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        getTeachList(res, mysql, context, complete);
        getClubList(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('addClub', context);
            }
        }

    });

    router.post('/', function (req, res, next) {
        var query1 = "Insert into Extracurricular (ClubName, ClubAdviser, ClubLocation) values (?, ?, ?)";
        console.log(req.body.adviser);
        var inserts = [req.body.clubname, req.body.adviser, req.body.location];
        var mysql = req.app.get('mysql');
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            res.redirect('/addClub');
        });
    });


    return router;
}();