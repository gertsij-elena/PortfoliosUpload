(function () {
    'use strict';

    angular
        .module('testapp')
        .factory('pictureService', factory);

    factory.$inject = ['$http'];

    function factory($http) {
        var fac = {};

        fac.GetPictures = function (id) {
            return $http.get('/api/Pictures/GetPicturesByUserId/'+id);
        };

        fac.UploadPicture = function (data) {
            return $http.post('/api/Pictures/UploadPicture/', data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        };
        fac.SaveToDb = function (picture) {
            return $http.post('/api/Pictures/PostToDb/', picture);
        };
        fac.DeletePicture = function (id) {
            return $http.delete('/api/Pictures/DeletePicture/' + id);
        };
        return fac;
    }
})();