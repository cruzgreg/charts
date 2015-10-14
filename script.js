
// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute', 'chart.js', 'ngResource']);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
});



// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $resource) {
    // create a message to display in our view

    var vm = this;

    vm.message = 'Everyone come and see how good I look!';

    var fbQuery = $resource('http://localhost:3000/api/firebase');

    vm.isActive = false;
    vm.query = {};
    vm.query.profileId = 19242162;
    vm.query.peerId1 = 87849822;
    vm.query.peerId2 = 100469241;
    vm.query.queryName = 'usersAndPageviewsOverTime';
    vm.query.startDate = '2015-07-01';
    vm.query.endDate = '2015-08-30';

    vm.callbackData = [];
    vm.dates = [];
    vm.datesData = [];
    vm.datesData1 = [];
    vm.datesData2 = [];

    //Chart JS
    vm.chartData = {};
    vm.chartData.labels = [];
    //vm.chartData.series = ['Co','Peer 1', 'Peer 2'];
    vm.chartData.series = ['Co','Peer Avg'];
    vm.chartData.data = [];


    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.parseData = _parseData;
    vm.parseArray = _parseArray;
    vm.fbParse = _fbParse;
    vm.takeAvg = _takeAvg;


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

            console.log(result);

            //vm.fbParse(result);
            
        })



    };


    function _fbParse (input){

        var avgArray = [];
        var i;
        for(i in input){
            if( typeof( input[i] ) ===  'object' && i === "0"){
                var tempArray = [];

                console.log( input[i] );

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
        console.log(vm.chartData.data);

    

    }



    function _parseArray (array){
        for (var i = 0, innerArray; innerArray = array[i]; i++) {
            vm.parseData(innerArray);
        }

        vm.chartData.data.push(vm.datesData1);
        //vm.chartData.data.push(vm.datesData2);

        console.log(vm.chartData.data);

        vm.isActive = true;

    };

    function _parseData (data) {
        for(var i = 0, dataPoint; dataPoint = data[i]; i++){
            vm.datesData1.push(dataPoint[0]);
            //vm.datesData2.push(dataPoint[1]);
        }

    };


});


scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});
