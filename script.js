(function () {
    'use strict';

// create the module and name it scotchApp
//var scotchApp = angular.module('scotchApp', ['$scope', 'ngRoute', 'Chart.js']);

// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute', 'chart.js']);

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
scotchApp.controller('mainController', ['$scope', '$resource', function($scope, $resource) {
    // create a message to display in our view
    //$scope.message = 'Everyone come and see how good I look!';

    var vm = this;

    var fbQuery = $resource('/api/firebase');

    vm.isActive = false;
    vm.query = {};

    vm.callbackData = [];
    vm.dates = [];
    vm.datesData = [];
    vm.datesData1 = [];
    vm.datesData2 = [];

    vm.chartObject = {};

    //Chart JS
    vm.labels = [];
    vm.series = ['Users','Pageviews'];
    vm.data = [];

    vm.submitQuery = _submitQuery;
    vm.clearForm = _clearForm;
    vm.parseData = _parseData;
    vm.parseArray = _parseArray;
    vm.fbParse = _fbParse;
    vm.createChart = _createChart;



    function _submitQuery(){
        var firebaseQuery = new fbQuery();
        firebaseQuery.query = vm.query;
        firebaseQuery.$save(function(result){
            vm.fbParse(result);
        });

        vm.createChart();

    };

    function _clearForm (){
        vm.query = {};
        vm.isActive = false;

    };

    function _fbParse (input){
        var i;
        for(i in input){
            if(typeof(input[i]) ===  'object'){
                vm.dates.push(i);

                var oneDayEncrypt = input[i];
                var oneDay = oneDayEncrypt[Object.keys(oneDayEncrypt)[0]];
                vm.datesData.push(oneDay);

            };

        };

        vm.labels.push(vm.dates);


        vm.parseArray(vm.datesData);

        vm.data.push(vm.datesData1);
        vm.data.push(vm.datesData2);

        vm.createChart();

    };

    function _parseArray (array){
        for (var i = 0, innerArray; innerArray = array[i]; i++) {
            vm.parseData(innerArray);
        }


    };

    function _parseData (data) {
        for(var i = 0, dataPoint; dataPoint = data[i]; i++){
            vm.datesData1.push(dataPoint[0]);
            vm.datesData2.push(dataPoint[1]);
        }



    };

    function _createChart(){

        return vm.labels;
        return vm.data;

        vm.isActive = true;

    };
}]);

scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

})();