
// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngRoute', 'chart.js', 'ngResource']);

// configure our routes
myApp.config(function($routeProvider) {
    $routeProvider

    // route 
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })

    // route 
    .when('/multiComp', {
        templateUrl : 'pages/multi.html',
        controller  : 'multiCompController'
    })

    // route 
    .when('/singleCo', {
        templateUrl : 'pages/singleCo.html',
        controller  : 'singleCoController'
    })

    // route
    .when('/newVsReturning', {
        templateUrl : 'pages/newVsReturning.html',
        controller  : 'newVsReturnController'
    })

    // route for Bell Curve
    .when('/bellCurve', {
        templateUrl : 'pages/bellCurve.html',
        controller  : 'bellController'
    })

    // route for Radar Chart
    .when('/radarChart', {
        templateUrl : 'pages/radarChart.html',
        controller  : 'radarController'
    })

    // route for Bar Chart
    .when('/barChart', {
        templateUrl : 'pages/barChart.html',
        controller  : 'barController'
    })

    // route 
    .when('/allQueries', {
        templateUrl : 'pages/allQueries.html',
        controller  : 'allQueriesController'
    });
});



myApp.controller('mainController', function($scope, $resource) {
    var vm = this;

    vm.message = 'Compare one company vs the average of two peers';

    var fbQuery = $resource('http://localhost:3000/api/firebase/coVsCompAvg');

    vm.isActive = false;
    vm.query = {};
    vm.query.profileId = 19242162;
    vm.query.peerId1 = 87849822;
    vm.query.peerId2 = 98099462;
    vm.query.queryName = 'usersAndPageviewsOverTime';
    vm.query.startDate = '2015-08-01';
    vm.query.endDate = '2015-08-31';

    vm.callbackData = [];
    vm.dates = [];
    vm.datesData = [];
    vm.datesData1 = [];
    vm.datesData2 = [];

    //Chart JS
    vm.chartData = {};
    vm.chartData.labels = [];
    vm.chartData.series = ["Zoe Report","Fashion Peers' Avg"];
    vm.chartData.data = [];


    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.takeAvg = _takeAvg;
    vm.fbParse = _fbParse;


    function _clearForm (){
        vm.isActive = false;

        vm.query = {};

        vm.chartData.labels = [];
        vm.chartData.series = [];
        vm.chartData.data= [];

        vm.datesData = [];
        vm.datesData1 = [];
        vm.datesData2 = [];

    };

    function _submitQuery(){

        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){

            vm.fbParse(result);
            
        })

    };

    function _fbParse (input){

        var avgArray = [];
        var i;
        for(i in input){
            if( typeof( input[i] ) ===  'object' && i === "0"){
                var tempArray = [];

                var j;
                var singleDataset = input[i];

                for( j in singleDataset ){  
                    vm.chartData.labels.push( j );
                                    
                    var oneDayEncrypt = singleDataset[j] ;
                    var oneDay = oneDayEncrypt[Object.keys(oneDayEncrypt)[0]];
                    
                    var k;

                    for(k in oneDay){
                        var data = oneDay[k] ;
                        var dataPoint = Number(data[Object.keys(data)[0]]);
                        tempArray.push(dataPoint);
                            
                    }

                }
                vm.chartData.data.push(tempArray);
                
            } 
            else if( typeof( input[i] ) ===  'object' ){
                
                var tempArray = [];
                var j;
                var singleDataset = input[i];

                for( j in singleDataset ){
                                                            
                    var oneDayEncrypt = singleDataset[j] ;
                    var oneDay = oneDayEncrypt[Object.keys(oneDayEncrypt)[0]];
                    
                    var k;

                    for(k in oneDay){
                        var data = oneDay[k] ;
                        var dataPoint = data[Object.keys(data)[0]];
                        tempArray.push(dataPoint);
        
                    }
                
                }
                avgArray.push(tempArray);      

            }

        }

        vm.takeAvg(avgArray);
       
    };

    function _takeAvg (array) {
        var meanArray = [];

        var cols = array[0].length;
        var rows = array.length;

        for (var col = 0; col < cols ; col++) {

            sum = 0;
            for (var row = 0; row < rows ; row++){
                sum += Number(array[row][col]);
            }
            meanArray.push(sum/rows);

        }

        vm.chartData.data.push(meanArray);

        vm.isActive = true;

    }
});

myApp.controller('multiCompController', function($scope, $resource) {
    var vm = this;

    vm.message = 'Compare one company vs two peers';

    var fbQuery = $resource('http://localhost:3000/api/firebase/multiCo');

    vm.isActive = false;
    vm.query = {};
    vm.query.profileId = 19242162;
    vm.query.peerId1 = 87849822;
    vm.query.peerId2 = 98099462;
    vm.query.queryName = 'usersAndPageviewsOverTime';
    vm.query.startDate = '2015-08-01';
    vm.query.endDate = '2015-08-31';

    vm.callbackData = [];
    vm.dates = [];
    vm.datesData = [];
    vm.datesData1 = [];
    vm.datesData2 = [];

    //Chart JS
    vm.chartData = {};
    vm.chartData.labels = [];
    vm.chartData.series = ['Zoe Report','BeautyCon','Love Goodly'];
    vm.chartData.data = [];


    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.fbParse = _fbParse;


    function _clearForm (){
        vm.isActive = false;

        vm.query = {};

        vm.chartData.labels = [];
        vm.chartData.series = [];
        vm.chartData.data= [];

        vm.datesData = [];
        vm.datesData1 = [];
        vm.datesData2 = [];

    };

    function _submitQuery(){

        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){

            vm.fbParse(result);
            
        })

    };


    function _fbParse (input){
        var i;
        for(i in input){
            if( typeof( input[i] ) ===  'object' && i === "0"){

                var tempArray = [];

                var j;
                var singleDataset = input[i];

                for( j in singleDataset ){
                        
                    vm.chartData.labels.push( j );
                                    
                    var oneDayEncrypt = singleDataset[j] ;
                    var oneDay = oneDayEncrypt[Object.keys(oneDayEncrypt)[0]];
                    
                    var k;

                    for(k in oneDay){

                        var data = oneDay[k] ;
                        var dataPoint = data[Object.keys(data)[0]];
                        
                        tempArray.push(dataPoint);
                            
                    }

                }
                vm.chartData.data.push(tempArray);
                
            } 
            else if( typeof( input[i] ) ===  'object' ){
                var j;
                var singleDataset = input[i];
                var tempArray = [];

                for( j in singleDataset ){
                                                            
                    var oneDayEncrypt = singleDataset[j] ;
                    var oneDay = oneDayEncrypt[Object.keys(oneDayEncrypt)[0]];
                    
                    var k;

                    for(k in oneDay){

                        var data = oneDay[k] ;
                        var dataPoint = data[Object.keys(data)[0]];
                        tempArray.push(dataPoint);
        
                    }
                
                }

                vm.chartData.data.push(tempArray);      

            }

        }

        vm.isActive = true;

    };
});

myApp.controller('singleCoController', function($scope, $resource) {
    var vm = this;

    vm.message = 'Compare users and pageviews for one company';

    var fbQuery = $resource('http://localhost:3000/api/firebase/singleCo');

    vm.isActive = false;
    vm.query = {};
    vm.query.profileId = 19242162;
    vm.query.queryName = 'usersAndPageviewsOverTime';
    vm.query.startDate = '2015-08-01';
    vm.query.endDate = '2015-08-31';

    vm.callbackData = [];
    vm.dates = [];
    vm.datesData = [];
    vm.datesData1 = [];
    vm.datesData2 = [];

    //Chart JS
    vm.chartData = {};
    vm.chartData.labels = [];
    vm.chartData.series = ['Users','Pageviews'];
    vm.chartData.data = [];

    //Register functions
    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.parseData = _parseData;
    vm.parseArray = _parseArray;
    vm.fbParse = _fbParse;


    function _submitQuery(){
        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){

            vm.fbParse(result);
        });


    };

    function _clearForm (){
        vm.isActive = false;

        vm.query = {};

        vm.chartData.labels = [];
        vm.chartData.series = ['Users','Pageviews'];
        vm.chartData.data= [];

        vm.datesData = [];
        vm.datesData1 = [];
        vm.datesData2 = [];

    };

    function _fbParse (input){
        var i;
        for(i in input){
            if(typeof(input[i]) ===  'object'){
                vm.chartData.labels.push(i);

                var oneDayEncrypt = input[i];
                var oneDay = oneDayEncrypt[Object.keys(oneDayEncrypt)[0]];
                vm.datesData.push(oneDay);

            };

        };

        vm.parseArray(vm.datesData);

    };

    function _parseArray (array){
        for (var i = 0, innerArray; innerArray = array[i]; i++) {
            vm.parseData(innerArray);
        }

        vm.chartData.data.push(vm.datesData1);
        vm.chartData.data.push(vm.datesData2);

        vm.isActive = true;

    };

    function _parseData (data) {
        for(var i = 0, dataPoint; dataPoint = data[i]; i++){
            vm.datesData1.push(dataPoint[0]);
            vm.datesData2.push(dataPoint[1]);
        }

    };
});

myApp.controller('newVsReturnController', function($scope, $resource) {
    var vm = this;

    vm.message = 'Compare new vs returning sessions for a company';

    var fbQuery = $resource('http://localhost:3000/api/firebase/newVsReturning');

    vm.isActive = false;
    vm.query = {};
    vm.query.profileId = 19242162;
    vm.query.queryName = 'newVsReturningSessions';
    vm.query.startDate = '2015-08-01';
    vm.query.endDate = '2015-08-31';

    //Chart JS
    vm.chartData = {};
    vm.chartData.labels = ['New Sessions', 'Returning Sessions'];
    vm.chartData.data = [];

    //Functions
    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.sumNewUsers = _sumNewUsers;
    vm.sumReturnUsers = _sumReturnUsers;
    vm.fbParse = _fbParse;


    function _clearForm (){
        vm.isActive = false;

        vm.query = {};

        vm.chartData.labels = [];
        vm.chartData.series = [];
        vm.chartData.data= [];

    };

    function _submitQuery(){

        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){
            vm.fbParse(result);
            
        })

    };

    function _fbParse (input){

        var allNew = [];
        var allReturns = [];
        var i;
        for(i in input){
            if( typeof( input[i] ) ===  'object' ){
                
                var j;
                var singleDataset = input[i];

                for( j in singleDataset ){
                    var oneDayEncrypt = singleDataset[j] ;
                    var newUser = oneDayEncrypt[Object.keys(oneDayEncrypt)[0]];
                    var returnUser = oneDayEncrypt[Object.keys(oneDayEncrypt)[1]];
                    
                    allNew.push(Number(newUser[1]));
                    allReturns.push(Number(returnUser[1]));
                
                }
                
            }

        }
        
        vm.sumNewUsers(allNew);
        vm.sumReturnUsers(allReturns);
    };

    function _sumNewUsers (array) {
        var sum = 0;

        for (var i = 0; i < array.length; i++) {
            sum += array[i];

        }

        vm.chartData.data.push(sum);
    }

    function _sumReturnUsers (array) {
        var sum = 0;

        for (var i = 0; i < array.length; i++) {
            sum += array[i];

        }

        vm.chartData.data.push(sum);
        vm.isActive = true;
    }



});

myApp.controller('allQueriesController', function($scope, $resource) {
    var vm = this;

    vm.message = 'All data currently being aggregated';

    var fbQuery = $resource('http://localhost:3000/api/firebase/allQueries');

    vm.isActive = false;
    vm.query = {};
    vm.query.profileId = 19242162;
    vm.query.date = '2015-08-01';

    vm.listData = [];

    //Functions
    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.showList = _showList;


    function _clearForm (){
        vm.isActive = false;
        //vm.query = {};
    };

    function _submitQuery(){

        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){
            console.log(result);
            vm.showList(result);

        })
    };

    function _showList(rawData){
        var i;
        for(i in rawData){
            vm.listData.push(i);

            if( typeof( rawData[i] ) ===  'object' ){
                var j;
                var singleDataset = rawData[i];

                for( j in singleDataset ){
                    var oneDayEncrypt = singleDataset[j] ;

                    for(var k = 0, point; point = oneDayEncrypt[k]; k++) {
                        vm.listData.push(point);
                    }
                }
            }
        }
        vm.isActive = true;

    };



});

myApp.controller('bellController', function($scope, $resource) {
    var vm = this;
    vm.$scope = $scope;

    vm.message = 'Average order value to eCommerce Conversion Rate';

    var fbQuery = $resource('http://localhost:3000/api/firebase/bellCurve');

    vm.isActive = false;
    vm.query = {};
    vm.query.timeSpan = 'last30days';
    vm.query.endDate = '2015-10-31';

    //Chart JS
    vm.chartData = {};
    vm.chartData.series = ['Hawke Universe'];
    vm.chartData.labels = [];
    vm.chartData.data = [];


    //Register functions
    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.fbParseData = _fbParseData;
    vm.countList = _countList;
    vm.orderData = _orderData;

    function _clearForm (){
        vm.isActive = false;

        //vm.query = {};
        //
        //vm.chartData.labels = [];
        //vm.chartData.series = ['Users','Pageviews'];
        //vm.chartData.data= [];
        //
        //vm.datesData = [];
        //vm.datesData1 = [];
        //vm.datesData2 = [];

    }

    function _submitQuery(){

        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){
            console.log(result);
            vm.fbParseData(result);
        });
    }

    function _fbParseData(input) {
        var tempArray = [];

        var i;
        for (i in input) {
            if(typeof( input[i] ) ===  'object') {

                var j;
                var singleDataset = input[i];
                for( j in singleDataset ) {
                    if(j === 'avgOrderVsConversionRate') {
                        tempArray.push(singleDataset[j].toFixed(2));
                    }
                }
            }

        }
        vm.orderData(tempArray);
        vm.countList(tempArray);

    }

    function _orderData(array) {
        array.sort(function(a,b){});
        vm.chartData.data.push(array);
        console.log(vm.chartData.data);

    }

    function _countList(array){
        var counter = 0;
        for(var i = 0; i < array.length; i++) {
            vm.chartData.labels.push(counter += 1);
        }
        vm.isActive = true;
    }


});

myApp.controller('radarController', function($scope, $resource) {
    var vm = this;
    vm.$scope = $scope;

    vm.message = 'Compare per session value by Source / Medium (denoted in $)';

    var fbQuery = $resource('http://localhost:3000/api/firebase/radarChart');

    vm.isActive = false;
    vm.query = {};
    vm.query.timeSpan = 'last30days';
    vm.query.endDate = '2015-10-31';

    //Chart JS
    vm.chartData = {};
    vm.chartData.labels = [
        "(direct) / (none)"
        , "email"
        , "google / organic"
        , "bing / organic"
        , "yahoo / organic"
        , "pinterest.com / referral"
        , "social / twitter"
        //, "facebook"

    ];

    vm.chartData.data = [];
    vm.directData = [];
    vm.bingData = [];
    vm.yahooData = [];
    vm.emailData = [];
    vm.googleData = [];
    vm.twitterData = [];
    vm.pinterestData = [];
    vm.tempArray = [];

    //Register functions
    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.fbParseData = _fbParseData;
    vm.takeAvgs = _takeAvgs;
    vm.avgDirect = _avgDirect;
    vm.avgEmail = _avgEmail;
    vm.avgGoogle = _avgGoogle;
    vm.avgBing = _avgBing;
    vm.avgYahoo = _avgYahoo;
    vm.avgTwitter = _avgTwitter;
    vm.avgPinterest = _avgPinterest;


    function _clearForm (){
        vm.isActive = false;

        //vm.query = {};
        //
        //vm.chartData.labels = [];
        //vm.chartData.series = ['Users','Pageviews'];
        //vm.chartData.data= [];
        //
        //vm.datesData = [];
        //vm.datesData1 = [];
        //vm.datesData2 = [];

    }

    function _submitQuery(){
        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){
            vm.fbParseData(result);
        });


    }

    function _fbParseData(input) {
        var i;
        for(i in input){

            if( typeof( input[i] ) ===  'object' ){

                var j;
                var singleDataset = input[i];

                for( j in singleDataset ){
                    if( typeof(singleDataset[j]) === 'object') {

                        var k;
                        var mediumData = singleDataset[j];
                        for(k in mediumData) {
                            if(k === "directNone") {
                                vm.directData.push(mediumData[k]);
                            }

                            if(k === "email") {
                                vm.emailData.push(mediumData[k]);
                            }

                            if(k === "googleOrganic") {
                                vm.googleData.push(mediumData[k]);
                            }

                            if(k === "bingOrganic") {
                                vm.bingData.push(mediumData[k]);
                            }

                            if(k === "yahooOrganic") {
                                vm.yahooData.push(mediumData[k]);
                            }

                            if(k === "socialTwitter") {
                                vm.twitterData.push(mediumData[k]);
                            }

                            if(k === "pinterestRef") {
                                vm.pinterestData.push(mediumData[k]);
                            }
                        }
                    }
                }
            }
        }
        vm.takeAvgs();

    }

    function _takeAvgs(){
        vm.avgDirect(vm.directData);
        vm.avgEmail(vm.emailData);
        vm.avgGoogle(vm.googleData);
        vm.avgBing(vm.bingData);
        vm.avgYahoo(vm.yahooData);
        vm.avgTwitter(vm.twitterData);
        vm.avgPinterest(vm.pinterestData);

        vm.chartData.data.push(vm.tempArray);
        vm.isActive = true;

    }

    function _avgDirect(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
           sum += dataPoint;
        }
        var output = (sum / array.length).toFixed(2);
        vm.tempArray[0] = output;

    }

    function _avgEmail(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
            sum += dataPoint;
        }
        var output = (sum / array.length).toFixed(2);
        vm.tempArray[1] = output;
    }

    function _avgGoogle(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
            sum += dataPoint;
        }
        var output = (sum / array.length).toFixed(2);
        vm.tempArray[2] = output;
    }

    function _avgBing(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
            sum += dataPoint;
        }
        var output = (sum / array.length).toFixed(2);
        vm.tempArray[3] = output;
    }

    function _avgYahoo(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
            sum += dataPoint;
        }
        var output = (sum / array.length).toFixed(2);
        vm.tempArray[4] = output;
    }

    function _avgTwitter(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
            sum += dataPoint;
        }
        var output = (sum / array.length).toFixed(2);
        vm.tempArray[5] = output;
    }

    function _avgPinterest(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
            sum += dataPoint;
        }
        var output = (sum / array.length).toFixed(2);
        vm.tempArray[6] = output;
    }


});

myApp.controller('barController', function($scope, $resource) {
    var vm = this;
    vm.$scope = $scope;

    vm.message = 'Compare eCommerce revenue metrics';

    var fbQuery = $resource('http://localhost:3000/api/firebase/barChart');

    vm.isActive = false;
    vm.query = {};
    vm.query.timeSpan = 'last30days';
    vm.query.endDate = '2015-10-31';


    //Chart JS
    vm.chartData = {};
    vm.chartData.data = [];
    vm.chartData.series = ['Hawke eComm Avg'];
    vm.chartData.labels = [
        "Direct traffic as % of ECR"
        , "New traffic as % of ECR"

    ];

    vm.directData = [];
    vm.newUserData = [];
    vm.tempArray = [];


    //Register functions
    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.fbParseData = _fbParseData;
    vm.takeAvgs = _takeAvgs;
    vm.avgDirect = _avgDirect;
    vm.avgNewUser = _avgNewUser;


    function _clearForm (){
        vm.isActive = false;

        //vm.query = {};
        //
        //vm.chartData.labels = [];
        //vm.chartData.series = ['Users','Pageviews'];
        //vm.chartData.data= [];
        //
        //vm.datesData = [];
        //vm.datesData1 = [];
        //vm.datesData2 = [];

    }

    function _submitQuery(){

        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){
            vm.fbParseData(result);
        });

    }

    function _fbParseData(input) {

        var i;
        for (i in input) {

            if (typeof( input[i] ) === 'object') {

                var j;
                var singleDataset = input[i];

                for (j in singleDataset) {
                    if (j === 'directRevPercent') {
                        vm.directData.push(singleDataset[j]);
                    }

                    if (j === 'newUserRevPercent') {
                        vm.newUserData.push(singleDataset[j]);
                    }

                }
            }
        }
        vm.takeAvgs();
    }

    function _takeAvgs(){
        vm.avgDirect(vm.directData);
        vm.avgNewUser(vm.newUserData);

        vm.chartData.data.push(vm.tempArray);
        vm.isActive = true;

    }

    function _avgDirect(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
            sum += dataPoint;
        }
        var output = (sum / array.length * 100).toFixed(1);
        vm.tempArray[0] = output;
    }

    function _avgNewUser(array) {
        sum = 0;
        for (var x = 0, dataPoint; dataPoint = array[x]; x++) {
            sum += dataPoint;
        }
        var output = (sum / array.length * 100).toFixed(1);
        vm.tempArray[1] = output;
    }


});
