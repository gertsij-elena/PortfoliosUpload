(function () {
    'use strict';

    angular
        .module('testapp')
        .factory('userService', factory);

    factory.$inject = ['$http'];

    function factory($http) {
        var fac = {};
        fac.GetAllRecords = function () {
            return $http.get('/api/Users/GetAllUsers');
        };
        fac.AddNewRecord = function (user) {
            return $http.post('/api/Users/PostUser', user);
        };
      
        return fac;
    }
})();