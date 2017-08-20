/// <reference path="angular.min.js" />
/// <reference path="angular-route.js" />

(function () {

    var app = angular.module('app', ['ngRoute']);

    app.provider('books', ['constants', function (constants) {
        this.$get = function () {
            var appName = constants.APP_TITLE
            var appDesc = constants.APP_DESCRIPTION;

            var version = constants.APP_VERSION;

            if (includeVersionInTitle) {
                appName += ' ' + version;
            }

            return {
                appName: appName,
                appDesc: appDesc
            };
        };

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };
    }]);

    app.config(['booksProvider', 'constants', '$routeProvider', '$locationProvider',
        function (booksProvider, constants, $routeProvider, $locationProvider) {
            booksProvider.setIncludeVersionInTitle(true);
            //console.log('title from constants service: ' + constants.APP_TITLE);
            $routeProvider.caseInsensitiveMatch = true;
            $routeProvider
                .when('/', {
                    templateUrl: '/templates/books.html',
                    controller: 'BooksController',
                    controllerAs: 'books'
                })
                .when('/AddBook', {
                    templateUrl: '/templates/addBook.html',
                    controller: 'AddBookController',
                    controllerAs: 'bookAdder'
                })
                .when('/EditBook/:bookID', {
                    templateUrl: '/templates/editBook.html',
                    controller: 'EditBookController',
                    controllerAs: 'bookEditor'
                })
                .otherwise('/');

            $locationProvider.html5Mode(true);
        }]);

    app.run(['$rootScope', function ($rootScope) {

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            //console.log('successfully changed routes');
        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            console.log('error changing routes');

            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);
        });
    }]);

}());