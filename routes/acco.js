var express = require('express');
var nodemailer = require('nodemailer');
 
module.exports = function(){
    var route = express.Router();
    var transporter = nodemailer.createTransport('smtps://mudeshi1209%40gmail.com:udiongoogle1209@smtp.gmail.com');

    route.get('/cl_requests', function(req,res){
        var render_data={notif:false, err:false}
        res.render('pages/acco/view_cl_req',render_data);
    });

    route.get('/list_cl', function(req,res){
        var render_data = {}
        var query = 'SELECT users.mi_no, users.name, users.gender, colleges.name as college_name FROM acco_request INNER JOIN users ON acco_request.mi_no=users.mi_no INNER JOIN colleges ON users.college=colleges.id WHERE colleges.id= ? AND acco_request.cl_request = 1'
        sql.query(query,[req.query.college], function(err, rows, fields){
            if(err) {
                res.send('<span class="alert alert-danger">'+err.toString()+'</span>');
            } else {
                render_data.members=rows;
                render_data.college=req.query.college;
            }
            res.render('parts/acco_cl_list', render_data);
        });
    });

    route.get('/group_requests', function(req,res){
        var render_data = {notif:false, err:false}
        var query = 'SELECT users.mi_no, users.name, users.gender, colleges.name as college_name, acco_request.group_no FROM acco_request INNER JOIN users ON acco_request.mi_no=users.mi_no INNER JOIN colleges ON users.college=colleges.id WHERE acco_request.cl_request=0 ORDER BY acco_request.group_no'
        sql.query(query, function(err, rows, fields){
            if(err) {
                render_data={notif:true,err:err};
            } else {
                var groups=[];
                var prev_gid=0;
                rows.forEach(function(row){
                    if(prev_gid != row.group_no)
                        groups.push({group:row.group_no, members:[row]});
                    else 
                        groups[groups.length-1].members.push(row);
                prev_gid=row.group_no });
                render_data.groups=groups;
                render_data.college=req.query.college;
            }
            res.render('pages/acco/view_group_req', render_data);
        });
    });

    route.get('/send_link', function(req,res){
        var users = req.query.users;
        if(!users)
            res.send('No users selected')
        else {
            var query = 'SELECT * FROM users WHERE ';
            for(var i=0; i<users.length; i++){
                query+=' mi_no="'+users[i]+'"';
                if(i<users.length-1) query+=' OR';
            }
            console.log(query);
            sql.query(query,function(err,rows){
                if(err)
                    res.send(err.toString());
                else {
                    var emails = [];
                    rows.forEach(function(row){emails.push(row.email);});
                    console.log(emails);
                    var mailOpts = {
                        from: 'udiboy@moodi.org',
                        to: emails.join(),
                        subject: 'Accomodation Link',
                        text: 'Hello World'
                    };

                    transporter.sendMail(mailOpts,function(err,info){
                        if(err)
                            res.send(err.toString());
                        else 
                            res.send('K');
                    });
                }
            });
        }
    });

    return route;
}
