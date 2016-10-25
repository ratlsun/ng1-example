(function (window, angular) {
    "use strict";

    angular.module('module.states.dashboard')
        .directive('dbFundDetailView', [
            function () {
                return {
                    restrict: 'E',
                    templateUrl: 'states.dashboard.fund-detail-view.html',
                    controller: 'states.dashboard.FundDetailViewController',
                    replace: 'true'
                };
            }]);

})(window, window.angular);