(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .controller('states.stats.MainController', [
            '$scope',
            'statsService',
            function ($scope, statsService) {

                $scope.labels = [];
                $scope.series = ['Units:'];
                $scope.data = [];
                $scope.chartOptions = {
                    elements: {
                        line: {
                            //tension: 0
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            }
                        }],
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }]
                    }
                };
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };

                // Simulate async data update
                statsService.getAllLeadTimeDistribution(
                    '065b0f0d-96ef-4e18-ac65-e5f1e0282923',
                    '7ef51567-0576-4c6b-815f-6246187e20df').then(function(data){
                    $scope.data.push(data);
                });

            }]);

})(window, window.angular);

