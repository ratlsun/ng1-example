(function (window, angular) {
    "use strict";

    angular.module('module.config', [])
        .constant('appConfig', {
            profiles: {
                active: 'mock',
                dev: {
                    apiUrl: '/'
                },
                mock: {
                    apiUrl: 'http://mock-api.com/tyUDmzRMOzBnzzCa.mock'
                },
                test: {
                },
                prod: {
                }
            },

            states: {
                dashboard: "dashboard",
                shopping: "shopping"
            },

            messageFetcher: {
                intervalTimeMs: 10000 //ms
            }
        });

})(window, window.angular);