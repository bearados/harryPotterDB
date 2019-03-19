module.exports = function () {
    var express = require('express');
    var router = express.Router();


    router.post('/', function (req, res, next) {
        var query1 = "select Extracurricular.ClubID, Extracurricular.ClubName, Extracurricular.ClubLocation, teacher.LastName from Extracurricular join teacher on Extracurricular.ClubAdviser = teacher.ID where Extracurricular.ClubName = ?";
        var mysql = req.app.get('mysql');
        var context = {};
        mysql.pool.query(query1, req.body.clubname, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.club = result[0];
            res.render('findClub', context);
        });

    });

    router.get('/', function (req, res) {
        res.render('findClub');
    });


    return router;
}();

