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


    function getStudList(res, mysql, context, complete) {
        mysql.pool.query("SELECT student.ID, student.FirstName, student.LastName, house.HouseName, student.GradeLevel, student.familiar FROM student join house on student.House = house.ID", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.stuList = results;
            complete();
        });
    }

    function getStudent(id, res, mysql, context, complete) {
        mysql.pool.query("SELECT student.ID, student.FirstName, student.LastName, house.HouseName, student.GradeLevel, student.familiar FROM student join house on student.House = house.ID where student.ID = ?", [id], function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student = results;
            complete();
        });
    }

    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        getHouseList(res, mysql, context, complete);
        getStudList(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('editStudent', context);
            }

        }

    });
    
    router.get('/:id', function (req, res) {
        var context = {};
        var callbackCount = 0;
        var mysql = req.app.get('mysql');
        console.log(req.params.id);
        getStudent(req.params.id, res, mysql, context, complete);
        getHouseList(res, mysql, context, complete);
        
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('editStudent', context);
            }

        }
    });

    router.post('/', function (req, res) {
        var context = {};

        var mysql = req.app.get('mysql');
        
        var query1 = "update student set FirstName = ?, LastName = ?, House = ?, GradeLevel = ?, familiar = ? where ID = ?";
        var inserts = [req.body.firstname, req.body.lastname, req.body.house, req.body.gradelevel, req.body.familiar, req.body.id];
        console.log(inserts);
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                console.log(err);
                return;
            }
            res.redirect('/editStudent');
        });
    });

    return router;
}();
