var express = require('express');

module.exports = function(){
    var route = express.Router();

    route.get('/add', function(req, res){
        res.render('pages/compi/add',{notif:false, err:false});
    });

    route.post('/add', function(req, res){
        sql.query('INSERT INTO competitions (name, min_team_size, max_team_size) VALUES (?,?,?)', 
                [req.body.name, req.body.min, req.body.max], 
                function(err){
                    res.render('pages/compi/add', {notif:true, err:err});
                });
    });

    route.get('/reg', function(req,res){
        var render_data = {notif:false, err:false};
        sql.query('SELECT * FROM competitions WHERE 1', function(err, rows, fields){
            if(err) {
                render_data.err=err;
                render_data.notif=true;
            } else {
                render_data.rows=rows;
            }
            res.render('pages/compi/view_reg', render_data);
        });
    });

    route.get('/reg/list', function(req,res){
        var render_data = {}
        var query = 'SELECT compi_reg.team , compi_reg.compi, compi_reg.mi_no, users.name, colleges.name as college_name FROM compi_reg INNER JOIN users ON compi_reg.mi_no=users.mi_no INNER JOIN colleges ON users.college=colleges.id WHERE compi_reg.compi= ?'
        sql.query(query,[req.query.compi], function(err, rows, fields){
            if(err) {
                res.send('<span class="alert alert-danger">'+err.toString()+'</span>');
            } else {
                var teams=[];
                var prev_tid=0;
                rows.forEach(function(row){
                    if(prev_tid != row.team)
                        teams.push({team:row.team, members:[row]});
                    else 
                        teams[teams.length-1].members.push(row);
                prev_tid=row.team });
                render_data.teams=teams;
                render_data.compi=req.query.compi;
            }
            res.render('parts/compi/reg_list', render_data);
        });
    });

    route.get('/reg/add', function(req,res){
        sql.query('INSERT INTO compi_reg (team,compi,mi_no)  VALUES (?,?,?)',
            [req.query.team,req.query.compi,req.query.mi_no], function(err){
                if(err)
                    res.send(err.toString());
                else 
                    res.redirect('/compi/reg');
            });
    });

    route.get('/reg/remove', function(req,res){
        sql.query('DELETE FROM compi_reg WHERE mi_no=? AND compi=?',
            [req.query.mi_no,req.query.compi], function(err){
                if(err)
                    res.send(err.toString());
                else 
                    res.redirect('/compi/reg');
            });
    });

    return route;
}

