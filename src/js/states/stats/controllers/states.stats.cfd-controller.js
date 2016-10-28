(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .controller('states.stats.CfdController', [
            '$scope',
            'statsService',
            function ($scope, statsService) {

                $scope.labels = [];
                $scope.series = [
                    '创意', '可用性提升', '组织级看板', '企业内应用', '单团队必须',
                    '选择', '开发', '上线', '测试', 'Archived'
                ];
                $scope.data = [];
                $scope.chartOptions = {
                    elements: {
                        line: {
                            tension: 0
                        },
                        point: {
                            pointStyle: 'line'
                        }
                    },
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
                                round: 'day',
                                tooltipFormat: 'YYYY-MM-DD',
                                displayFormats: {
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
                statsService.getFinishedUnitCountsByDate(
                    '065b0f0d-96ef-4e18-ac65-e5f1e0282923',
                    '7ef51567-0576-4c6b-815f-6246187e20df', [
                        '7a2879a8-85be-438d-865d-3aff5194b802',
                        '6e8fc8e8-aeb9-43d4-a5ac-d0555940a8b4',
                        '22ae12e9-2a02-42ae-aa34-7531ce7d4cbc',
                        '3d7f5b4b-07b6-4510-95de-94b5c45dcb72',
                        '13dc07e3-4612-4c80-a2fc-c570e32fc777',
                        'fa75107c-559e-4fd3-a27f-953dadbc42af',
                        '933abeed-8b07-4510-a374-2c1bcff318af',
                        '5bd92665-0fa0-42ec-ab3b-ca4517f020c7',
                        'a58e84f4-f60c-4964-8579-60f558a9d53d',
                        '1c63ea18-1823-4a78-9c3a-8590a9cd56dd'
                    ]).then(function(data){
                        _.forEach(data, function(counts){
                            $scope.data.push(counts);
                        });
                    }
                );

            }]);

})(window, window.angular);

