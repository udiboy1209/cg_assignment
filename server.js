var express = require('express');
var mysql = require('mysql');
var app = express();
sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'udisdatabase1209',
    database: 'server2016'
});
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var bodyParser = require('body-parser');

app.use(require('serve-favicon')(__dirname+'/favicon.ico'));

app.use(session({
    store: new MySQLStore({}, sql),
    secret: 'mahsession',
    saveUninitialized: false,
    resave: false
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
app.set('view engine','ejs');

app.use('/',require('./routes')());

app.use(express.static('public'));

app.listen(3000);
