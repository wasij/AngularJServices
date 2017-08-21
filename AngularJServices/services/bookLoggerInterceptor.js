/// <reference path="~/scripts/angular.min.js" />
"use strict";

(function () {

    angular.module('app')
        .factory('bookLoggerInterceptor', ['$q', '$log', bookLoggerInterceptor]);

    function bookLoggerInterceptor($q, $log) {

        return {
            request: requestInterceptor,
            responseError: responseErrorInterceptor
        };

        function requestInterceptor(config) {

            $log.info('HTTP ' + config.method + ' request - ' + config.url);
            return config;

        }

        function responseErrorInterceptor(response) {

            $log.info('HTTP ' + response.config.method + ' request - ' + response.config.url);
            return $q.reject(response);

        }
    }
})();