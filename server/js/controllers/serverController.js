/**
 * Created by cruz on 9/29/15.
 */
var firebase = require('firebase');
var myFirebaseRefRoot = new firebase('https://boiling-heat-2495.firebaseio.com/');
var q = require('q');

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

    //console.log(query);
    //console.log(queryDetails);

    runAll();

    function runAll (err) {
        if(err){
            console.log(err);
            return;

        } else {
            runStepOne()
                .then(runStepTwo)
                .then(runStepThree)
                .done(sendRes);

        }

    };

    function runStepOne (){

        var deferred = q.defer();

        getOneQueryForDateRange(queryDetails.profileId, queryDetails.queryName, queryDetails.startDate, queryDetails.endDate);

        deferred.resolve(myResData);
        //deferred.resolve('Resolved for one');
        deferred.reject("Error");
        return deferred.promise;

    };

    function runStepTwo (){

        var deferred = q.defer();

        getOneQueryForDateRange(queryDetails.peerId1, queryDetails.queryName, queryDetails.startDate, queryDetails.endDate);

        deferred.resolve(myResData);
        //deferred.resolve('Resolved for two');
        deferred.reject("Error");
        return deferred.promise;

    };

    function runStepThree (){

        var deferred = q.defer();

        getOneQueryForDateRange(queryDetails.peerId2, queryDetails.queryName, queryDetails.startDate, queryDetails.endDate);

        deferred.resolve(myResData);
        //deferred.resolve('Resolved for three');
        deferred.reject("Error");
        return deferred.promise;

    };

    function sendRes(){

        //var deferred = q.defer();

        console.log('Printing my res data array:');
        console.log(myResData);
        res.json(myResData);

        //deferred.resolve(myResData);
        //deferred.resolve('Resolved for two');
        //deferred.reject("Error");
        //return deferred.promise;

    }

    function getOneQueryForDateRange (id, queryName, startDate, endDate, err) {
        var myFirebaseRef = myFirebaseRefRoot
            .child('profileId/ga:' + id + '/byQuery/'+ queryName);

        if(!err){
            myFirebaseRef.orderByKey().startAt(startDate).endAt(endDate)
                .on("value", function(snapshot) {
                    console.log('ProfileID:'+id +' '+ JSON.stringify(snapshot.val()));

                    console.log(res.statusCode);
                    //console.log(res.getHeader('content-type'));

                    //res.json(snapshot.val());

                    myResData.push(JSON.stringify(snapshot.val()));

                });
        } else {
            console.log('Error when running ' + id);
            console.log(err);
        }

    };




};







