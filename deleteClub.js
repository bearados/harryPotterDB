module.exports = function () {
    var express = require('express');
    var router = express.Router();


    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        mysql.pool.query("SELECT Extracurricular.ClubID, Extracurricular.ClubName, Extracurricular.ClubLocation, teacher.LastName FROM Extracurricular left join teacher on Extracurricular.ClubAdviser = teacher.ID", function (error, results, fields) {
            if (error) {
                next(error);
                return;
            }
            context.clubList = results;
            res.render('deleteClub', context);
        });

    });


    router.get('/:id', function (req, res) {

        var mysql = req.app.get('mysql');
        console.log(req.params.id);
        var query1 = "delete from Extracurricular where ClubID = ?";
        var inserts = [req.params.id];
        console.log(inserts);
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                console.log(err);
                return;
            }
            res.redirect('/deleteClub');
        });
    });

    return router;
}();

