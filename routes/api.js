var express = require('express');

module.exports = function(){
    var route = express.Router();

    route.get('/college', function(req,res, next){
        var city = req.query.city;
        var query = 'SELECT id, name FROM colleges WHERE ';
        if(city)
            query+=sql.format('city = ?',[city]);
        else
            query+='1';

        var ret = {error:0, message:"OK"};
        sql.query(query, function(err, rows, fields){
            if(err){
                ret.error=1;
                ret.message=err.toString();
            } else {
                ret.data = rows;
                if(rows.length==0)
                    ret.message="Empty";
            }
            res.ret_data=ret;
            next();
        });
    });

    route.get('/city', function(req,res, next){
        var query = 'SELECT * FROM cities';

        var ret = {error:0, message:"OK"};
        sql.query(query, function(err, rows, fields){
            if(err){
                ret.error=1;
                ret.message=err.toString();
            } else {
                ret.data = rows;
                if(rows.length==0)
                    ret.message="Empty";
            }
            res.ret_data=ret;
            next();
        });
    });

    route.get('/user', function(req,res, next){
        var query = 'SELECT * FROM users WHERE college = ?';

        var ret = {error:0, message:"OK"};
        sql.query(query, [req.query.college], function(err, rows, fields){
            if(err){
                ret.error=1;
                ret.message=err.toString();
            } else {
                ret.data = rows;
                if(rows.length==0)
                    ret.message="Empty";
            }
            res.ret_data=ret;
            next();
        });
    });

    route.get('/cl', function(req,res, next){
        var query = 'SELECT users.mi_no, users.name, colleges.name AS college_name FROM (clusers INNER JOIN users ON clusers.mi_no=users.mi_no) INNER JOIN colleges ON users.college=colleges.id WHERE ';
        var where_stat = ' users.college = ?';

        if(!req.query.college) 
            where_stat = '1';
        else 
            where_stat = sql.format(where_stat, [req.query.college]);

        var ret = {error:0, message:"OK"};
        sql.query(query+where_stat, function(err, rows, fields){
            if(err){
                ret.error=1;
                ret.message=err.toString();
            } else {
                ret.data = rows;
                if(rows.length==0)
                    ret.message="Empty";
            }
            res.ret_data=ret;
            next();
        });
    });

    route.all('/*',function(req, res){
        if(!res.ret_data)
            res.status(404).send("Not Found");
        else 
            if(req.query.callback)
                res.send(req.query.callback+'('+JSON.stringify(res.ret_data)+');');
            else 
                res.send(JSON.stringify(res.ret_data));
    });

    return route;
}
