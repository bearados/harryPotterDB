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
app.use('/deleteStudent', require('./delStudent.js'));
app.use('/addStudent', require('./addStudent'));
app.use('/addTeacher', require('./addTeacher'));
app.use('/deleteTeacher', require('./deleteTeacher'));
app.use('/editStudent', require('./editStudent'));
app.use('/findTeacher', require('./findTeacher'));
app.use('/addClub', require('./addClub'));
app.use('/deleteClub', require('./deleteClub'));
app.use('/findClub', require('./findClub'));
app.use('/clubStudents', require('./clubStudents'));
app.use('/houseInfo', require('./houseInfo'));
app.use('/deleteClass', require('./deleteClass'));
app.use('/addClass', require('./addClass'));
app.use('/addStudentsClub', require('./addStudentsClub'));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/students', function (req, res) {
    res.render('Students');
});

app.get('/houses', function (req, res) {
    res.render('Houses');
});

app.get('/clubs', function (req, res) {
    res.render('Clubs');
});

app.get('/teachers', function (req, res) {
    res.render('Teachers');
});

app.get('/classes', function (req, res) {
    res.render('Classes');
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