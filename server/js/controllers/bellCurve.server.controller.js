var firebase = require('firebase');
var myFirebaseRefRoot = new firebase('https://glaring-fire-5175.firebaseio.com/');
var Debug = require('console-debug');

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

    getOneQueryForDateRange(queryDetails.timeSpan, queryDetails.endDate);



    function getOneQueryForDateRange (timeSpan, endDate) {
        var myFirebaseRef = myFirebaseRefRoot.child(timeSpan + '/' + endDate);

        myFirebaseRef.on("value", function(snapshot) {
                //console.log( JSON.stringify(snapshot.val()));

                res.json(snapshot.val());
            });


    };

};
