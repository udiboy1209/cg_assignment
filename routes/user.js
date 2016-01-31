var express = require('express');

module.exports = function(){
    var route = express.Router();

    route.get('/edit', function(req,res){
        var render_data={notif:false, err:false, user:false}
        if(req.query.mi_no){
            sql.query('SELECT * FROM users WHERE mi_no = ?', [req.query.mi_no],
                function(err, rows, fields){
                    if(err){
                        render_data.notif=true;
                        render_data.err=err;
                    } else {
                        if(rows.length==0){
                            render_data.notif=true;
                            render_data.err="No such user found!";
                        } else {
                            render_data.user=rows[0];
                            render_data.fields=fields;
                            render_data.disabled=['mi_no'];
                        }
                    }
                    res.render('pages/user_edit', render_data);
                });
        } else {
            res.render('pages/user_edit', render_data);
        }
    });

    route.post('/edit', function(req,res){
        sql.query('UPDATE users SET ? WHERE mi_no = ?', [req.body, req.body.mi_no],
            function(err, rows, fields){
                if(err)
                    res.render('pages/user_edit', {notif:true, err:err, user:false});
                else
                    res.render('pages/user_edit', {notif:true, err: false, user: false});
            });
    });

    return route;
}

