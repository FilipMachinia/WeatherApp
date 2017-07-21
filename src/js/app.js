'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('WeatherCtrl', function ($scope, $http) {

    $scope.location = '';
    $scope.updateWeather = function() {
        var weather = { list:[], data: {}, clouds: null };
        var forecastDays = 30;
        var todaysUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + $scope.location + ',at&units=metric&callback=JSON_CALLBACK&APPID=f9dbd911bc01df1d9ce563b2ba4d3209';
        var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + $scope.location + ',at&units=metric&callback=JSON_CALLBACK&APPID=f9dbd911bc01df1d9ce563b2ba4d3209';

        $http.jsonp(forecastUrl).success(function(data) {
            if ($scope.location != '' && data && data.list) {
                for (var i = 0; i < forecastDays; i++) {
                    if (i % 4 == 0) weather.list.push(data.list[i]); //show forecast for every 12 hours (3*4)
                }
                $scope.weather = weather;
            }
        });
    };

});
//show icon
myApp.directive('cloudIcon', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@'
        },
        controller: function($scope) {
            $scope.imgurl = function() {
                if ($scope.cloudiness < 30) {
                    return 'https://image.flaticon.com/icons/svg/136/136723.svg';
                } else if ($scope.cloudiness < 80) {
                    return 'https://image.flaticon.com/icons/svg/494/494475.svg';
                } else {
                    return 'https://image.flaticon.com/icons/svg/148/148828.svg';
                }
            };
        },
        template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
    };
});
