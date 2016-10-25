(function (window, angular) {
    "use strict";

    angular.module('module.states.dashboard')
        .controller('states.dashboard.FundDetailViewController', [
            '$scope',
            function ($scope) {
                $scope.$watch('selectedFund', function(){
                    if ($scope.selectedFund) {
                        var tdata = $scope.selectedFund.trend.data[0];
                        $scope.diff = tdata[tdata.length - 1] - tdata[0];
                        $scope.diffPercent = $scope.diff / tdata[0] * 100;
                    }
                }, true);
            }
        ]);

})(window, window.angular);