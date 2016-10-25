(function (window, angular) {
    "use strict";

    angular.module('module.widgets.header')
        .controller('widgets.header.MainController', [
            '$scope',
            '$state',
            '$interval',
            'appConfig',
            'fundService',
            function ($scope, $state, $interval, appConfig, fundService) {
                $scope.activeMenu = $state.current.name;

                $scope.gotoDashboard = function () {
                    $state.go(appConfig.states.dashboard);
                };

                $scope.gotoShopping = function () {
                    $state.go(appConfig.states.shopping);
                };

                $scope.gotoStats = function () {
                    $state.go(appConfig.states.stats);
                };

                $scope.messageListener = $interval(function(){
                    fundService.getFundMessages().then(function(resp) {
                        $scope.messages = resp;
                    });
                }, appConfig.messageFetcher.intervalTimeMs);

                $scope.$on('$destroy', function() {
                    $interval.cancel($scope.messageListener);
                });
            }]);

})(window, window.angular);

