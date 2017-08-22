/// <reference path="~/scripts/angular.min.js" />

(function () {

    angular.module('app')
        .factory('currentUser', currentUser);

    function currentUser() {

        return {
            lastBookEdited: lastBookEdited
        };

        var lastBookEdited = {};
    }

})();