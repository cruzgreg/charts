var firebase = require('firebase');
var myFirebaseRefRoot = new firebase('https://boiling-heat-2495.firebaseio.com/');
var q = require('q');
var Debug = require('console-debug');

var console = new Debug({
    uncaughtExceptionCatch: true, // Do we want to catch uncaughtExceptions?
    consoleFilter: [], // Filter these console output types, Examples: 'LOG', 'WARN', 'ERROR', 'DEBUG', 'INFO'
    logToFile: true, // if true, will put console output in a log file folder called 'logs'
    logFilter: ['LOG','DEBUG','INFO'], // Examples: Filter these types to not log to file, Examples: 'LOG', 'WARN', 'ERROR', 'DEBUG', 'INFO'
    colors: true // do we want pretty pony colors in our console output?
});

//console.log("I am a log!");
//console.warn("I am a warn!");
//console.error("I am a error!");
//console.debug("I am a debug!");
//console.info("I am a info!");
//
//// can also display objects
//obj = {
//    test1: [1,2,3,4],
//    test3: ["ohai","there"],
//    test4: true
//};
//console.log(obj);

//var profileId = 19242162;
//var peerId1 = 87849822;
//var peerId2 = 98099462;
//var queryName = 'usersAndPageviewsOverTime';
//var startDate = '2015-08-01';
//var endDate = '2015-08-20';

//var goodProfileId = 100469241;


module.exports.submitQuery = function(req, res){

    var query = req.body;
    var queryDetails = query['query'];

    var myResData = [];

    runAll();

    function runAll() {
        runStepOne()
            .then(runStepTwo)
            .then(runStepThree)
            .finally(sendRes);
    };

    function runStepOne (){
        var deferred = q.defer();

        deferred.resolve(
            getOneQueryForDateRange(queryDetails.profileId, queryDetails.queryName, queryDetails.startDate, queryDetails.endDate)
            );

        return deferred.promise;

    };

    function runStepTwo (){
        var deferred = q.defer();

        deferred.resolve(
            getOneQueryForDateRange(queryDetails.peerId1, queryDetails.queryName, queryDetails.startDate, queryDetails.endDate)
            );

        return deferred.promise;

    };

    function runStepThree (){
        var deferred = q.defer();

        deferred.resolve(
            getOneQueryForDateRange(queryDetails.peerId2, queryDetails.queryName, queryDetails.startDate, queryDetails.endDate)
            );

        return deferred.promise;

    };

    function sendRes(){
        var deferred = q.defer();

        var obj = myResData.reduce(function(o, v, i) {
            o[i] = v;
            return o;
        },
            {});

        deferred.resolve( res.json(obj) );

        return deferred.promise;

    }

    function getOneQueryForDateRange (id, queryName, startDate, endDate) {
        var deferred = q.defer();

        var myFirebaseRef = myFirebaseRefRoot
            .child('profileId/ga:' + id + '/byQuery/'+ queryName);

        myFirebaseRef.orderByKey().startAt(startDate).endAt(endDate)
            .on("value", function(snapshot) {
                console.log('ProfileID:'+id +' '+ JSON.stringify(snapshot.val()));
                
                deferred.resolve( myResData.push( snapshot.val() ) );

            });

        return deferred.promise;

    };

};