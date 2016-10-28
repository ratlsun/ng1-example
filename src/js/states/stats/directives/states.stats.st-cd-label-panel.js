(function (window, angular) {
    "use strict";

    angular.module('module.states.stats')
        .directive('stCdLabelPanel', [
            function () {
                return {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'states.stats.cd-label.html',
                    controller: 'states.stats.CdLabelController',
                    replace: 'true'
                };
            }]);

})(window, window.angular);