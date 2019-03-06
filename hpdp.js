var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/findStudent', require('./getStudent.js'));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

/*app.post('/findStudent', function (req, res, next) {
    console.log("in post: " + req.body.FirstName);
    var context = {};
    var query1 = "select * from student where FirstName = ? AND LastName = ?";
    var test = "select * from teacher";
    var inserts = [req.body.FirstName, req.body.LastName]
   
    mysql.pool.query(query1, inserts, function (err, result) {
        if (err) {
            next(err);
            return;
        }
        context.student = result;

        res.render('findStudent', context);
    });
});*/


app.get('/deleteStudent', function (req, res) {
    var context = {};
    context.fname = req.body.firstName;
    context.lname = req.body.lastName;
    res.render('deleteStudent', context);
});




app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
