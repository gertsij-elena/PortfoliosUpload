(function () {
    'use strict';

    angular
        .module('testapp')
        .controller('pictureController', controller);

    function controller($scope, $http, pictureService, passIdService, $window) {
        $scope.picturesData = null;
        $scope.error_type = "(*.jpeg,*.png,*.gif)";
        var id = passIdService.getData();

        $scope.id=passIdService.getData();
        $scope.name = $window.localStorage.getItem('name');
      
        //Get items
        pictureService.GetPictures(id).then(function (response) {
          
            $scope.picturesData = response.data;

            Counter($scope);

        }, function () {
            alert('Нет соединения с сервером'); // Failed
        });

        $scope.pictures = {
            PictureId: '',
            PictureName:'',
            UserId:''
        };

        // Delete item 
        $scope.delete = function (pic) {

            var id = pic.PictureId;

            var index = $scope.picturesData.indexOf(pic);
          
            pictureService.DeletePicture(id)
            .then(function successCallback(response) {
               
                $scope.picturesData.splice(index, 1);
                Counter($scope);
                $scope.apply();
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
            
        }
        //add picture
        $scope.getFiles = function ($files) {
          
            for (var i = 0; i < $files.length; i++) {
                
                var reader = new FileReader();
                reader.fileName = $files[i].name;
                reader.readAsDataURL($files[i]);
            }
            //alert($files[0].type);
            if ((($files[0].type) === "image/jpeg") | (($files[0].type)=== "image/png")|(($files[0].type)==="image/gif"))
            {
                $scope.Files = $files;
                var data = new FormData();
                $scope.$apply();
                angular.forEach($scope.Files, function (value, key) {
                    data.append(key, value);
                });
               
                    pictureService.UploadPicture(data).then(function (response) {
                      
                        if (response.data !== null) {
                            $scope.pictures.PictureName = response.data;
                            $scope.pictures.UserId = JSON.parse(id);
                            pictureService.SaveToDb($scope.pictures).then(function (response) {
                                $scope.picturesData.push(response.data);
                                $scope.$apply();
                            })
                        }
                    }, function errorCallback(response) {
                        alert("Error : " + response.data.ExceptionMessage);
                    });
            }
            //else {
            //    $scope.error_type = "*.jpeg,*.png,*.gif";
            //    $scope.$apply();
            //}
        }

        var Counter = function ($scope) {
            var count = 0;
            angular.forEach($scope.picturesData, function () {
                count = count + 1;
            });
            $scope.count = count;
        };

        //pagination block
        $scope.itemsPerPage = 8;
        $scope.currentPage = 0;

        $scope.range = function () {
            var rangeSize = 3;
            var ps = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                if (i >= 0) {
                    ps.push(i);
                }
            }
            return ps;
        };
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.DisablePrevPage = function () {
            return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.count / $scope.itemsPerPage) - 1;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.currentPage++;
            }
        };

        $scope.DisableNextPage = function () {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };
    }
    angular.module('testapp').filter('pagination', function () {
        return function (input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    });
})();