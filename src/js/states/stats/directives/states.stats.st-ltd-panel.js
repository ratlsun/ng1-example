(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .directive('stLtdPanel', [
            function () {
                return {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'states.stats.ltd.html',
                    controller: 'states.stats.LtdController',
                    replace: 'true'
                };
            }]);

})(window, window.angular);