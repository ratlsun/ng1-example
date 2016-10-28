(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .controller('states.stats.CdController', [
            '$scope',
            'statsService',
            function ($scope, statsService) {

                $scope.labels = [];
                $scope.series = ['Lead Time'];
                $scope.data = [];
                $scope.chartOptions = {
                    showLines: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                suggestedMax: 6
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            position: 'bottom',
                            time: {
                                tooltipFormat: 'YYYY-MM-DD',
                                displayFormats: {
                                    hour: 'YYYY-MM-DD',
                                    day: 'YYYY-MM-DD',
                                    week: 'YYYY-MM-DD'
                                }
                            }
                        }]
                    }
                };
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };

                // Simulate async data update
                statsService.getAllLeadTimesByDate(
                    '065b0f0d-96ef-4e18-ac65-e5f1e0282923',
                    '7ef51567-0576-4c6b-815f-6246187e20df').then(function(data){
                    $scope.data.push(data);
                });

            }]);

})(window, window.angular);

