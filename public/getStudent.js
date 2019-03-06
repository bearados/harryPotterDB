module.exports = function () {
    var express = require('express');
    var router = express.Router();


    router.get('/', function (req, res, next){
        res.render('findStudent');
    });

    /*router.post('/', function (req, res, next) {
        console.log("in post");
        console.log("post: " + req.body);
        var context = {};
        var mysql = req.app.get('mysql');
        var query = "select * from student where FirstName = ?";
        mysql.pool.query(query, req.body.FirstName, req.body.LastName, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.student = result;
            console.log("results: " + result);
            res.render('findStudent', context);
        });
    });*/


    return router;
}();
