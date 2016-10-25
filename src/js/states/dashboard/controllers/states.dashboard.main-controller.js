(function (window, angular) {
    "use strict";

    angular.module('module.states.dashboard')
        .controller('states.dashboard.MainController', [
            '$scope',
            'fundService',
            function ($scope, fundService) {

                fundService.getAllFunds().then(function(resp){
                    $scope.funds = resp;
                    if (resp && resp.length > 0) {
                        $scope.selectedFund = resp[0];
                    }
                });

                $scope.showFundDetail = function (fund) {
                    $scope.selectedFund = fund;
                };

            }]);

})(window, window.angular);

