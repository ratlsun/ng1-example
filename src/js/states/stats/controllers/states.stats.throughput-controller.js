(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .controller('states.stats.ThroughputController', [
            '$scope',
            'statsService',
            function ($scope, statsService) {

                $scope.labels = [];
                $scope.series = ['Units'];
                $scope.data = [];
                $scope.chartOptions = {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                suggestedMax: 6
                            }
                        }]
                    }
                };
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };

                // Simulate async data update
                statsService.getFinishedUnitCountsByPeriod(
                    '065b0f0d-96ef-4e18-ac65-e5f1e0282923',
                    '7ef51567-0576-4c6b-815f-6246187e20df').then(function(data){
                    var value = [];
                    _.forEach(data, function(point){
                        $scope.labels.push(point.x);
                        value.push(point.y);
                    });
                    $scope.data.push(value);
                });

            }]);

})(window, window.angular);

