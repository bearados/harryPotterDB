module.exports = function () {
    var express = require('express');
    var router = express.Router();

   

    router.get('/', function (req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');
        var query1 = "SELECT class.Location, class.ClassName, class.ID, class.TextBook, class.Teacher, teacher.LastName FROM class join teacher on class.Teacher = teacher.ID";
        mysql.pool.query(query1, function (error, results, fields) {
            if (error) {
                next(error);
                return;
            }
            context.classList = results;
            res.render('deleteClass', context);
        });

    });

    router.get('/:id', function (req, res) {

        var mysql = req.app.get('mysql');
        console.log(req.params.id);
        var cid = req.params.id;
        var query1 = "delete from class where ID = ?";
        mysql.pool.query(query1, cid, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            res.redirect('/deleteClass');

        });
    });



    return router;
}();