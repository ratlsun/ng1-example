(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .directive('stThroughputPanel', [
            function () {
                return {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'states.stats.throughput.html',
                    controller: 'states.stats.ThroughputController',
                    replace: 'true'
                };
            }]);

})(window, window.angular);