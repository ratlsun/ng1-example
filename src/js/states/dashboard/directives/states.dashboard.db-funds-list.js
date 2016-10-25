(function (window, angular) {
    "use strict";

    angular.module('module.states.dashboard')
        .directive('dbFundsList', [
            function () {
                return {
                    restrict: 'E',
                    templateUrl: 'states.dashboard.funds-list.html',
                    controller: 'states.dashboard.FundsListController',
                    replace: 'true'
                };
            }]);

})(window, window.angular);