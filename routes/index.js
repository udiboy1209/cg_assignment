var express = require('express');

module.exports=function() {
    var route = express.Router();

    route.get('/',function(req, res){
        var loggedIn = req.session.root;
        var title='Login';
        if(loggedIn) title='Admin Menu';
        res.render('index',{loggedIn:loggedIn, title:title});
    });

    route.post('/login', function(req, res){
        if(req.body.user == 'root' && req.body.pwd == 'pass'){
            req.session.root=true;
            req.session.save();
        } 
        res.redirect('/');
    });

    route.get('/logout', function(req,res){
        req.session.root=false;
        req.session.save();
        res.redirect('/');
    });

    route.get('/*', function(req,res,next){
        if(req.session.root)
            next()
        else
            res.redirect('/');
    });

    custom_queries = {
        'users':'SELECT users.mi_no, users.name, users.phone, users.email, users.dob, users.year_of_study, colleges.name AS college, cities.name AS city FROM users INNER JOIN colleges ON users.college = colleges.id INNER JOIN cities ON colleges.city = cities.id ORDER BY users.mi_no',
        'colleges':'SELECT colleges.id, colleges.name, cities.name AS city FROM colleges INNER JOIN cities ON colleges.city = cities.id ORDER BY colleges.id',
        'clusers':'SELECT users.mi_no, users.name, users.phone, users.email, colleges.name AS college, cities.name AS city FROM clusers INNER JOIN users ON clusers.mi_no = users.mi_no INNER JOIN colleges ON users.college = colleges.id INNER JOIN cities ON colleges.city = cities.id ORDER BY users.mi_no',
        'compi_reg':'SELECT users.mi_no, users.name, colleges.name AS college, compi_reg.team, competitions.name AS competition FROM compi_reg INNER JOIN competitions ON compi_reg.compi = competitions.id INNER JOIN users ON users.mi_no = compi_reg.mi_no INNER JOIN colleges ON users.college = colleges.id ORDER BY competitions.id',
        'acco_request':'SELECT users.mi_no, users.name, colleges.name AS college, acco_request.`group_no` FROM acco_request INNER JOIN users ON users.mi_no = acco_request.mi_no INNER JOIN colleges ON users.college = colleges.id ORDER BY acco_request.group_no'
        };

    route.get('/view/:name', function(req,res,next){
        var sel_query = custom_queries[req.params.name] || 'SELECT * FROM ??';
        sql.query(sel_query, [req.params.name], function(err,rows,fields){
            res.render('view',{title:'Showing Table: '+req.params.name, err:err,fields:fields,rows:rows});
        });
    });

    route.use('/api/',require('./api')());
    route.use('/college/',require('./college')());
    route.use('/user/',require('./user')());
    route.use('/cl/',require('./cl')());
    route.use('/compi/',require('./compi')());
    route.use('/acco/',require('./acco')());

    return route;
}
