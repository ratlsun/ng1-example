(function (window, angular) {
    "use strict";

    angular.module('module.states.shopping')
        .controller('states.shopping.MainController', [
            '$scope',
            '$stateParams',
            'fundService',
            'ngDialog',
            function ($scope, $stateParams, fundService, ngDialog) {

                $scope.shoppingForm = {
                    fundId: $stateParams.fid || 0,
                    number: 0,
                    password: ''
                };

                fundService.getAllFunds().then(function(resp){
                    $scope.funds = resp;
                });

                $scope.submitShopping = function () {
                    //validation
                    fundService.buyFund($scope.shoppingForm).then(function(resp){
                        if (resp && resp.result == 0) {
                            var dialog = ngDialog.open({
                                template: 'states.shopping.alert.html',
                                controller: [
                                    '$scope',
                                    'ngDialog',
                                    '$state',
                                    'appConfig',
                                    function($scope, ngDialog, $state, appConfig) {
                                        $scope.back = function() {
                                            ngDialog.close(dialog.id);
                                            $state.go(appConfig.states.dashboard);
                                        };
                                        $scope.next = function() {
                                            ngDialog.close(dialog.id);
                                        }
                                }]
                            });
                        }
                    });
                };

            }]);

})(window, window.angular);

