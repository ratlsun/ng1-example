(function (window, angular) {
    "use strict";

    angular.module('module.states.dashboard')
        .controller('states.dashboard.FundsListController', [
            '$scope',
            '$state',
            'appConfig',
            'fundService',
            function ($scope, $state, appConfig, fundService) {

                $scope.buy = function (fund) {
                    $state.go(appConfig.states.shopping, {'fid': fund.id});
                };

                $scope.comment = function (fund) {
                    if (fund.newComment) {
                        fundService.postComment(fund.id, fund.newComment).then(function(resp){
                            if (resp && resp.result == 0) {
                                if (!fund.comments) {
                                    fund.comments = [];
                                }
                                fund.comments.push(fund.newComment);
                                fund.newComment = "";
                            }
                        });
                    }
                };

                $scope.selectFund = function (fund) {
                    $scope.selectedFund = fund;
                };
            }
        ]);

})(window, window.angular);