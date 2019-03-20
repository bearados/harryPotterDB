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


    function gethouseStudList(res, mysql, complete, context, hid) {
       
        var query1 = "select student.ID, student.FirstName, student.LastName, student.GradeLevel, student.familiar from student where student.House = ?";
        mysql.pool.query(query1, hid, function (error, result) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.stuList = result;
            complete();
        });
    }

    function getthisHouse(res, mysql, context, complete, id) {
        mysql.pool.query("SELECT house.ID, house.HouseName, house.Location, house.HouseColors, house.HouseGhost, house.HouseMascot, teacher.FirstName, teacher.LastName FROM house join teacher on house.ID = teacher.HeadofHouse where house.ID = ?", id, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.info = results[0];
            complete();
        });
    }

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var mysql = req.app.get('mysql');
        var context = {};
        getHouseList(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('houseInfo', context);
            }
        }
    });


    router.post('/', function (req, res, next) {
        var callbackCount = 0;
        var mysql = req.app.get('mysql');
        var context = {};
        var hid = req.body.house;
        getHouseList(res, mysql, context, complete);
        gethouseStudList(res, mysql, complete, context, hid);
        getthisHouse(res, mysql, context, complete, hid);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('houseInfo', context);
            }
        }
    });


    return router;
}();