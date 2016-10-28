(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .directive('stCdPanel', [
            function () {
                return {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'states.stats.cd.html',
                    controller: 'states.stats.CdController',
                    replace: 'true'
                };
            }]);

})(window, window.angular);