var express = require('express');

module.exports = function(){
    var route = express.Router();

    route.get('/city_add', function(req, res){
        res.render('pages/college/city_add',{notif:false, err:false});
    });

    route.post('/city_add', function(req, res){
        sql.query('INSERT INTO cities (name) VALUES (?)', 
                [req.body.name], 
                function(err){
                    res.render('pages/college/city_add', {notif:true, err:err});
                });
    });

    route.get('/add', function(req, res){
        res.render('pages/college/add', {notif:false});
    });

    route.post('/add', function(req, res){
        sql.query('INSERT INTO colleges (name, city) VALUES (?,?)', 
                [req.body.name, req.body.city], 
                function(err){
                    res.render('pages/college/add', {notif:true, err:err});
                });
    });

    return route;
}
