module.exports = function () {
    var express = require('express');
    var router = express.Router();
    
    router.get('/', function (req, res, next){
        var context = {};
        res.render('findStudent', context);
    });

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

    function getStudent(res, mysql, context, inserts, complete) {
        console.log(inserts);
        var query1 = "select student.ID, student.FirstName, student.LastName, house.HouseName, student.GradeLevel, student.familiar from student join house on student.House = house.ID where student.FirstName = ? OR student.LastName = ?";
        mysql.pool.query(query1, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student = results[0];
            complete();
        });
    }


    router.post('/', function (req, res, next) {
        var context = {};
        var callbackCount = 0;
        
        var inserts = [req.body.firstname, req.body.lastname];
        console.log(req.body.firstname);
        var mysql = req.app.get('mysql');
        getClubList(res, mysql, context, complete);
        getStudent(res, mysql, context, inserts, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('findStudent', context);
            }
        }
    });


    return router;
}();
