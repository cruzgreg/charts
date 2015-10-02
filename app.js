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

//define routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/views/googlecharts.html');

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

app.post('/api/firebase', serverController.submitQuery);




