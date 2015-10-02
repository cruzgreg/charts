/**
 * Created by cruz on 9/28/15.
 */


var firebase = require('firebase');
var myFirebaseRefRoot = new firebase('https://boiling-heat-2495.firebaseio.com/');

var query1 = 'usersAndPageviewsOverTime';
var profileId1 = 100204953;
var aug01 = '2015-08-01';
var aug20 = '2015-08-20';


exports.signup = function(req, res) {

    // Init Variables
    var user = new User(req.body);

    function getOneQueryForDateRange (id, queryName, startDate, endDate, err) {
        var myFirebaseRef = myFirebaseRefRoot
            .child('profileId/ga:' + id + '/byQuery/'+ queryName);

        if(!err){
            myFirebaseRef.orderByKey().startAt(startDate).endAt(endDate)
                .on("value", function(snapshot) {
                    console.log('ProfileID:'+id +' '+ JSON.stringify(snapshot.val()));
                });
        } else {
            console.log(err);
        }

    };

}



//getOneQueryForDateRange(profileId1, query1, aug01, aug20);
