/**
 * Created by cruz on 9/23/15.
 */

var firebase = require('firebase');
var myFirebaseRefRoot = new firebase('https://boiling-heat-2495.firebaseio.com/');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var serverController = require('./server/js/controllers/serverController');

app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//define routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/pages/home.html');

});

app.use('/js', express.static(__dirname + '/client/js'));

app.post('/query', function(req, res){
    console.log(req.body);
    //use the req inputs from above to call the
    res.end();
});

app.listen(3000, function(){
    console.log('ready on port 3000');
});

app.post('http://localhost:3000/api/firebase', serverController.submitQuery);

