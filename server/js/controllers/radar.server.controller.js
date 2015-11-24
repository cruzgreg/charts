var firebase = require('firebase');
var Debug = require('console-debug');

//Firebase databases
//greg@hurffhouse acct
var myFirebaseRefRoot = new firebase('https://glaring-fire-5175.firebaseio.com/');

//cruzgreg@gmail acct
var soloFirebaseRefRoot = new firebase('https://blinding-torch-5272.firebaseio.com/');

var console = new Debug({
    uncaughtExceptionCatch: true, // Do we want to catch uncaughtExceptions?
    consoleFilter: [], // Filter these console output types, Examples: 'LOG', 'WARN', 'ERROR', 'DEBUG', 'INFO'
    logToFile: true, // if true, will put console output in a log file folder called 'logs'
    logFilter: ['LOG','DEBUG','INFO'], // Examples: Filter these types to not log to file, Examples: 'LOG', 'WARN', 'ERROR', 'DEBUG', 'INFO'
    colors: true // do we want pretty pony colors in our console output?
});


module.exports.submitQuery = function(req, res){

    var query = req.body;
    var queryDetails = query['query'];
    var responseData = {};

    getOneQueryForDateRange(queryDetails.startDate, queryDetails.endDate);


    function getOneQueryForDateRange (startDate, endDate) {
        var myFirebaseRef = myFirebaseRefRoot.child(startDate + '/' + endDate);
        var soloFirebaseRef = soloFirebaseRefRoot.child(startDate + '/' + endDate);

        myFirebaseRef.on("value", function(snapshot) {
            responseData.avg = snapshot.val();
        });

        soloFirebaseRef.on("value", function(snapshot) {
            responseData.solo = snapshot.val();
        });

        res.json(responseData);

    };

};
