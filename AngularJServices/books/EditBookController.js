/// <reference path="~/scripts/angular.min.js" />

(function () {

    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'dataService', '$log', '$location', EditBookController]);

    function EditBookController($routeParams, dataService, $log, $location) {

        var vm = this;

        dataService.getBookByID($routeParams.bookID)
            .then(getBookSuccess)
            .catch(getBookError);

        function getBookSuccess(book) {
            vm.currentBook = book;
        }

        function getBookError(reason) {
            $log.error(reason);
        }

        vm.saveBook = function () {

            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError);

        };

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }

        function updateBookError(errorMessage) {
            $log.error(errorMessage);
        }
    }

})();