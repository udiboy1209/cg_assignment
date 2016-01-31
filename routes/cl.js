var express = require('express');

module.exports = function(){
    var route = express.Router();

    route.get('/edit', function(req,res){
        var render_data={notif:false, err:false}
        res.render('pages/cl/edit',render_data);
    });

    route.post('/edit', function(req,res){
        var del_query = 'DELETE FROM clusers WHERE college = ?';
        var ins_query = 'INSERT INTO clusers ( mi_no, college) VALUES (?,?)'
        var render_data={notif:false, err:false, user:false}
        sql.query(del_query,[req.body.college], function(err){
            if(err) {
                render_data.notif=true; render_data.err=err;
                res.render('pages/cl/edit',render_data);
            } else {
                if(!req.body.remove)
                    sql.query(ins_query, [req.body.cl, req.body.college], function(err){
                        if(err) {
                            render_data.notif=true; render_data.err=err;
                        } else {
                            render_data.notif=true; render_data.err=false;
                        }
                        res.render('pages/cl/edit',render_data);
                    });
                else 
                    res.render('pages/cl/edit',render_data);
            }
        });
    });

    route.get('/password', function(req,res){
        var render_data={notif:false, err:false}
        res.render('pages/cl/password',render_data);
    });

    route.post('/password', function(req,res){
        var render_data={notif:false, err:false}
        var query = 'UPDATE clusers SET password = ? WHERE mi_no = ?';

        sql.query(query, [req.body.pass, req.body.cl], function(err){
            if(err){
                render_data.notif=true; render_data.err=err;
            } else {
                render_data.notif=true; render_data.err=false;
            }
            res.render('pages/cl/password',render_data);
        });
    });

    return route;
}

