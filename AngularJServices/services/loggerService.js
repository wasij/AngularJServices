/// <reference path="~/scripts/angular.min.js" />

(function () {

    angular.module('app')
           .service('logger', BookAppLogger);

    function loggerBase() {

    }

    loggerBase.prototype.output = function (message) {
        console.log('loggerBase: ' + message);
    };

    function BookAppLogger() {
        loggerBase.call(this);

        this.logBook = function (book) {
            console.log('Book:' + book.title);
        }
    }

    BookAppLogger.prototype = Object.create(loggerBase.prototype);

})();