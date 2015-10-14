/**
 * Created by cruz on 9/23/15.
 */

var firebase = require('firebase');
var myFirebaseRefRoot = new firebase('https://boiling-heat-2495.firebaseio.com/');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var serverController = require('./server/js/controllers/serverController');
var singleCo = require('./server/js/controllers/singleCo.server.controller');
var coVsCompAvg = require('./server/js/controllers/coVsCompAvg.server.controller');
var multiCo = require('./server/js/controllers/multiCo.server.controller');

var liveServer = require("live-server");

//Create the application
var app = express();

//Add Middleware necessary for REST APIs
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/js', express.static(__dirname + '/client/js'));

app.use(cors());


//define routes
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/client/pages/home.html');
});

app.post('/query', function(req, res, next){
    console.log(req.body);
    //use the req inputs from above to call the
    res.end();
});

app.listen(3000, function(){
    console.log('ready on port 3000');
});

app.post('/api/firebase', serverController.submitQuery);

app.post('/api/firebase/singleCo', singleCo.submitQuery);

app.post('/api/firebase/coVsCompAvg', coVsCompAvg.submitQuery);

app.post('/api/firebase/multiCo', multiCo.submitQuery);

