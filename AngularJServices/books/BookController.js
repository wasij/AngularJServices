/// <reference path="~/scripts/angular.min.js" />

(function () {

    angular.module('app')
           .controller('BooksController', ['books', 'dataService', 'logger', 'badgeService', '$q', '$log', '$route', 'currentUser', BooksController]);

    function BooksController(books, dataService, logger, badgeService, $q, $log, $route, currentUser) {

        var vm = this;

        vm.appName = books.appName;

        //var booksPromise = dataService.getAllBooks();
        //var readersPromise = dataService.getAllReaders();

        //$q.all([booksPromise, readersPromise])
        //    .then(getAllDataSuccess)
        //    .catch(getAllDataError);

        //function getAllDataSuccess(dataArray) {
        //    vm.allBooks = dataArray[0];
        //    vm.allReaders = dataArray[1];
        //}

        //function getAllDataError(reason) {
        //    console.log(reason);
        //}

        dataService.getAllBooks()
            .then(getBooksSuccess, null, getBooksNotification)
            .catch(errorCallBack)
            .finally(getAllBooksComplete);

        function getBooksSuccess(books) {
            //throw 'Error In Success Handler';
            vm.allBooks = books;
        }

        function errorCallBack(errorMsg) {
            console.log('Error Message: ' + errorMsg);
        }

        //function getBooksError(reason) {
        //    console.log(reason);
        //}

        function getBooksNotification(notification) {
            console.log('Promise Notifications: ' + notification);
        }

        function getAllBooksComplete() {
            //console.log('getAllBooks has completed');
        }

        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(errorCallBack)
            .finally(getAllReadersComplete);

        function getReadersSuccess(readers) {
            vm.allReaders = readers;
            $log.awesome('All readers retrieved');
        }

        function getAllReadersComplete() {
            //console.log('getAllReaders has completed');
        }

        vm.deleteBook = function (bookID) {

            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError)
        };

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(errorMessage) {
            $log.error(errorMessage);
        }

        vm.getBadge = badgeService.retrieveBadge;

        vm.currentUser = currentUser;

        //logger.output('BooksController has been created.');        
    }

}());