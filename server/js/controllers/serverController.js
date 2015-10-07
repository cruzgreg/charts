/**
 * Created by cruz on 9/29/15.
 */


var firebase = require('firebase');
var myFirebaseRefRoot = new firebase('https://boiling-heat-2495.firebaseio.com/');

//var profileId1 = 100204953;
//var query1 = 'usersAndPageviewsOverTime';
//var aug01 = '2015-08-01';
//var aug20 = '2015-08-20';


module.exports.submitQuery = function(req, res){


    var query = req.body;
    var queryDetails = query['query'];


    getOneQueryForDateRange(queryDetails.profileId, queryDetails.queryName, queryDetails.startDate, queryDetails.endDate);

    function getOneQueryForDateRange (id, queryName, startDate, endDate, err) {
        var myFirebaseRef = myFirebaseRefRoot
            .child('profileId/ga:' + id + '/byQuery/'+ queryName);

        if(!err){
            myFirebaseRef.orderByKey().startAt(startDate).endAt(endDate)
                .on("value", function(snapshot) {
                    console.log('ProfileID:'+id +' '+ JSON.stringify(snapshot.val()));

                    res.json(snapshot.val());
                });
        } else {
            console.log(err);
        }

    };

};







