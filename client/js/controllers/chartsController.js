/**
 * Created by cruz on 9/27/15.
 */


app.controller('chartsController', ['$scope', '$http', '$resource', '$location',
    function($scope, $http, $resource, $location) {

        var vm = this;

        var fbQuery = $resource('http://localhost:3000/api/firebase');

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







    }


]);
