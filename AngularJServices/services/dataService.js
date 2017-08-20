/// <reference path="~/scripts/angular.min.js" />

(function () {
    
    angular.module('app')
           .factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]);

    function dataService($q, $timeout, $http, constants) {

        return {
            getAllBooks: getAllBooks,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook,
            getAllReaders: getAllReaders
        };

        //function getAllBooks() {            
        //    var booksArray = [
        //        {
        //            book_id: 1,
        //            title: 'Book 1',
        //            author: 'Author 1',
        //            year_published: '2000'
        //        },
        //        {
        //            book_id: 2,
        //            title: 'Book 2',
        //            author: 'Author 2',
        //            year_published: '4000'
        //        },
        //        {
        //            book_id: 3,
        //            title: 'Book 3',
        //            author: 'Author 3',
        //            year_published: '6000'
        //        }
        //    ];
        //    var deferred = $q.defer();
        //    $timeout(function () {
        //        var successful = true;
        //        if (successful) {
        //            //deferred.notify('Just getting started gathering books...');
        //            //deferred.notify('Almost done gathering books...');
        //            deferred.resolve(booksArray);
        //        }
        //        else {
        //            deferred.reject('Error retrieving books.');
        //        }
        //    }, 1000);
        //    return deferred.promise;
        //}

        function getAllReaders() {
            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Reader 1',
                    weeklyReadingGoal: 10,
                    totalMinutesRead: 5001
                },
                {
                    reader_id: 2,
                    name: 'Reader 2',
                    weeklyReadingGoal: 20,
                    totalMinutesRead: 2501
                },
                {
                    reader_id: 3,
                    name: 'Reader 3',
                    weeklyReadingGoal: 30,
                    totalMinutesRead: 300
                }
            ];

            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(readersArray);
            }, 1500);

            return deferred.promise;
        }

        function getAllBooks() {

            return $http({
                method: 'GET',
                url: 'BookService.asmx/GetAllBooks',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                },
                transformResponse: transformGetBooks
            })
            .then(sendResponseData)
            .catch(sendGetBooksError);            
        }

        function transformGetBooks(data, headersGetter) {

            var transformed = angular.fromJson(data);

            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });

            console.log(transformed);
            return transformed;
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendGetBooksError(response) {
            return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');
        }

        function getBookByID(bookID) {
            //return $http({
            //    method: 'GET',
            //    url: 'BookService.asmx/GetBookByID',
            //    params: { bookID: bookID }
            //})
            return $http.get('BookService.asmx/GetBookByID', {
                params: { bookID: bookID }
            })
            .then(sendResponseData)
            .catch(sendGetBooksError);
        }

        function updateBook(book) {
            return $http({
                method: 'POST',
                url: 'BookService.asmx/UpdateBookDetails',
                data: JSON.stringify({"book_id": book.book_id, "bookDetails":book})
            })
            .then(updateBookSuccess)
            .catch(updateBookError);
        }

        function updateBookSuccess(response) {
            return 'Book Updated: ' + response.config.data.title;
        }

        function updateBookError(response) {
            return $q.reject('Error updating book(s). (HTTP status: ' + response.status + ')');
        }

        function addBook(newBook) {
            //return $http({
            //    method: 'POST',
            //    url: 'BookService.asmx/AddBook',
            //    data: JSON.stringify({ "newBook": newBook })
            //})
            return $http.post('BookService.asmx/AddBook', newBook, {
                        transformRequest: transformPostRequest
                    })
                    .then(addBookSuccess)
                    .catch(addBookError);
        }

        function transformPostRequest(data, headersGetter) {
            data.newBook = true;

            console.log(data);

            return JSON.stringify({ "newBook": data });
        }

        function addBookSuccess(response) {
            return 'Book Added: ' + response.config.data.title;
        }

        function addBookError(response) {
            return $q.reject('Error adding book. (HTTP status: ' + response.status + ')');
        }

        function deleteBook(bookID) {
            return $http({
                method: 'POST',
                url: 'BookService.asmx/DeleteBook',
                data: JSON.stringify({ "bookID": bookID })
            })
            .then(deleteBookSuccess)
            .catch(deleteBookError);
        }

        function deleteBookSuccess(response) {
            return 'Book Deleted: ' + response.config.data.title;
        }

        function deleteBookError(response) {
            return $q.reject('Error deleting book(s). (HTTP status: ' + response.status + ')');
        }
    }
})();