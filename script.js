// create the module and name it scotchApp
//var scotchApp = angular.module('scotchApp', ['$scope', 'ngRoute', 'Chart.js']);

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


    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.parseData = _parseData;
    vm.parseArray = _parseArray;
    vm.fbParse = _fbParse;


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

    function _submitQuery(){

        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){

            //vm.fbParse(result);
            console.log(result);
        });

        console.log('Hitting submit button');

    };



    function _fbParse (input){
        console.log(vm.query);

        var i;
        for(i in input){
            if(typeof(input[i]) ===  'object'){
                vm.chartData.labels.push(i);

                var oneDayEncrypt = input[i];
                var oneDay = oneDayEncrypt[Object.keys(oneDayEncrypt)[0]];
                vm.datesData.push(oneDay);

            };

        };

        //console.log(vm.chartData.labels);

        vm.parseArray(vm.datesData);


    };

    function _parseArray (array){
        for (var i = 0, innerArray; innerArray = array[i]; i++) {
            vm.parseData(innerArray);
        }

        vm.chartData.data.push(vm.datesData1);
        vm.chartData.data.push(vm.datesData2);

        //console.log(vm.chartData.data);

        vm.isActive = true;

    };

    function _parseData (data) {
        for(var i = 0, dataPoint; dataPoint = data[i]; i++){
            vm.datesData1.push(dataPoint[0]);
            vm.datesData2.push(dataPoint[1]);
        }

    };


});

scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});
