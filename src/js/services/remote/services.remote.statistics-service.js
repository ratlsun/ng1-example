(function (window, angular) {
    "use strict";

    angular.module('module.services')
        .factory('statsService', [
            'Restangular',
            function (Restangular) {
                var config = function(){
                    //return Restangular;
                    return Restangular.withConfig(function(RestangularConfigurer) {
                        RestangularConfigurer.setBaseUrl('http://kanban.agilean.cn/api/v1');
                    })
                };

                return {

                    getAllLeadTimeDistribution: function (boardId, streamId) {
                        return config().all('stats').customGET('ltd', {
                            bid: boardId,
                            sid: streamId
                        });
                    },

                    getAllLeadTimesByDate: function (boardId, streamId) {
                        return config().all('stats').customGET('cd', {
                            bid: boardId,
                            sid: streamId
                        });
                    },

                    getAllLeadTimesByDateLabel: function (boardId, streamId) {
                        return config().all('stats').customGET('cd-label', {
                            bid: boardId,
                            sid: streamId
                        });
                    },

                    getFinishedUnitCountsByDate: function (boardId, streamId, stepIds) {
                        return config().all('stats').customPOST({
                            boardId: boardId,
                            streamId: streamId,
                            stepIds: stepIds
                        }, 'cfd');
                    },

                    getFinishedUnitCountsByPeriod: function (boardId, streamId) {
                        return config().all('stats').customGET('throughput', {
                            bid: boardId,
                            sid: streamId
                        });
                    }
                };
            }]);

})(window, window.angular);
