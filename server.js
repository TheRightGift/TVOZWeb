process.env.PWD = process.cwd();
// let path       = require('path');
let logger     = require('morgan');
// const formidable = require('formidable');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var moment = require('moment');
const mustacheExpress = require('mustache-express');
const device = require('express-device');
app.use(device.capture());
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

const VOD = require('./model/vod');
const liveTV = require('./model/livetv');
const connect = require("./config/dbConfig");

//require the http module
const http = require("http").Server(app);
// require the socket.io module
// const socket = require("socket.io");
//integrating socketio
// io = socket(http);
const port = 5000;

//
//	Check for HTTPS
//
//app.use(force_https);

//
//	Expose the public folder to the world
//
app.use(express.static(__dirname + "/public"));

//
//	Remove the information about what type of framework is the site running on
//
app.disable('x-powered-by');

//
// HTTP request logger middleware for node.js
//
app.use(logger('dev'));

//
//	Parse all request as regular text, and not JSON objects
//
app.use(bodyParser.json());

//
//	Parse application/x-www-form-urlencoded
//
app.use(bodyParser.urlencoded({ extended: true}));

//////////////////////////////////////////

//routes
app.get('/', function(req, res){ 
    if(req.device.type == 'phone'){
        //get detail of liveTv program for current month
        let d = new Date();
        let fDay = 1;        
        let mth = 3;//d.getMonth();
        let yr = d.getFullYear();
        let lDay = new Date(yr, mth + 1, 0).getDate();
        let currentMonth = d.toLocaleString('default', { month: 'long' });

        let firstDayOfMonth = new Date(yr, mth, fDay, 00, 00, 00, 00);
        let lastDayOfMonth = new Date(yr, mth, lDay, 23, 59, 00, 00);

        liveTV.find({date: {$gt: firstDayOfMonth, $lt: lastDayOfMonth}}, {}, function(err, docs){
            if(err) throw err;//if error with liveTv
    
            //thorw liveTv docs into a new array        
            let liveTvArr = [];
            let tempArr = docs;
            let a, len = tempArr.length;
            for(a = 0; a < len; a++){
                let now = moment(tempArr[a]['date']);
                let dDate = now.format("ddd, MMM DD, h:mm:ss a");
                tempArr[a]['nuDate'] = dDate;
                liveTvArr.push(tempArr[a]);
            }
            
            //get VOD
            VOD.find({}, {}, function(error, docs){
                if(error) throw error;

                let vodArr = [];
                vodArr = docs;

                res.render('index', {
                    'tv': liveTvArr,
                    'vod': vodArr,
                    'month': currentMonth
                });
                
            }).sort('-createdAt');
            // res.render('index', {
            //     'tv': liveTvArr,
            //     'month': currentMonth
            // });
            
        }).sort('-date');
        
    } else {
        res.render('unsupportedMedia', {});
    }   
});



http.listen(port, () => {
    console.log("Running on Port: " + port);
});