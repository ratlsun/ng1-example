(function (window, angular) {
    "use strict";

    angular.module('module.widgets.header')
        .directive('appHeader', [
            function () {
                return {
                    restrict: 'E',
                    scope: {
                        user: "="
                    },
                    templateUrl: 'widgets.header.main.html',
                    controller: 'widgets.header.MainController',
                    replace: 'true'
                };
            }]);

})(window, window.angular);