(function (window, angular) {
    "use strict";

    angular.module('module.main', [
        //lib
        'ui.router',
        'restangular',
        'chart.js',
        'ngDialog',
        //template
        'module.templates',
        //app
        'module.config',
        'module.services',
        'module.widgets',
        'module.states'
    ]).config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        'RestangularProvider',
        'appConfig',
        function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, appConfig) {

            var serverProfile = appConfig.profiles[appConfig.profiles.active];
            RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json;charset=UTF-8'});
            RestangularProvider.setBaseUrl(serverProfile.apiUrl);
            RestangularProvider.setDefaultHttpFields({
                cache: false
            });
            if (appConfig.profiles.active !== 'dev') {
                RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
            }

            $locationProvider.hashPrefix('!').html5Mode(false);

            $urlRouterProvider.otherwise(appConfig.states.dashboard);
            $stateProvider.state(appConfig.states.dashboard, {
                url: '/dashboard',
                templateUrl: 'states.dashboard.main.html',
                controller: 'states.dashboard.MainController'
            }).state(appConfig.states.shopping, {
                url: '/shopping?fid',
                templateUrl: 'states.shopping.main.html',
                controller: 'states.shopping.MainController'
            });
        }
    ]);

})(window, window.angular);
