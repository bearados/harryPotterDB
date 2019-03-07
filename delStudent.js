module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res, next) {
        res.render('deleteStudent');
    });


    router.get('/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        var query1 = "select FirstName, LastName from student where id = ?";
        var inserts = [req.params.id];
        mysql.pool.query(query1, inserts, function (err, result) {
            if (err) {
                next(err);
                return;
            }
            context.student = result;

            res.render('deleteStudent', context);
        });

    });


    return router;
}();
