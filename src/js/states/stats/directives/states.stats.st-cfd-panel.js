(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .directive('stCfdPanel', [
            function () {
                return {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'states.stats.cfd.html',
                    controller: 'states.stats.CfdController',
                    replace: 'true'
                };
            }]);

})(window, window.angular);