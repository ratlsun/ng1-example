(function (window, angular) {
    "use strict";

    angular.module('module.services')
        .factory('fundService', [
            'Restangular',
            function (Restangular) {
                return {

                    getAllFunds: function () {
                        return Restangular.all('/api/allfunds.do').getList();
                    },

                    postComment: function (id, comment) {
                        return Restangular.all('/api/commentfund.do').customPOST({id: id, comment: comment});
                    },

                    buyFund: function (form) {
                        return Restangular.all('/api/buyfund.do').customPOST(form);
                    },

                    getFundMessages: function () {
                        return Restangular.all('/api/allfundmessages.do').getList();
                    }

                };
            }]);

})(window, window.angular);