(function () {
    'use strict';

    angular
        .module('testapp')
        .controller('userController', controller);

    function controller($rootScope, $scope, $http, userService, passIdService, $window) {
        $scope.usersData = null;
       
        //Get items
        userService.GetAllRecords().then(function (response) {

            $scope.usersData = response.data;

            Counter($scope);

        }, function () {
            alert('Нет соединения с сервером'); // Failed
        });

        $scope.User = {
            UserId: '',
            UserName: ''
        };

        $scope.clear = function () {
            $scope.User.UserId = '';
            $scope.User.UserName = ''

        };
        //Add item
        $scope.submit = function () {
                userService.AddNewRecord($scope.User)
                    .then(function successCallback(response) {
                        $scope.usersData.push(response.data);

                        Counter($scope);

                        $scope.clear();
                        //alert("Item Added Successfully !!!");
                    }, function errorCallback(response) {
                        alert("Error : " + response.data.ExceptionMessage);
                    });
           
        };


        //show pictures
        $scope.show_pictures = function (user) {
          
            var id = user.UserId;
            var name = user.UserName;

            $window.localStorage.setItem('name', user.UserName);

            passIdService.addData(id);
            $window.location.href = ('/Home/Show/');

        };
        var Counter = function ($scope) {
            var count = 0;
            angular.forEach($scope.usersData, function () {
                count = count + 1;
            });
            $scope.count = count;
        };

        //pagination block
        $scope.itemsPerPage = 3;
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


        //datepicker
        $scope.today = function () {
            $scope.User.BirthDate = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.User.BirthDate = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(1950, 5, 5),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();



        $scope.open2 = function () {
            $scope.popup2.opened = true;

        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
          {
              date: tomorrow,
              status: 'full'
          },
          {
              date: afterTomorrow,
              status: 'partially'
          }
        ];

        function getDayClass(data) {
            var date = data.date,
              mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
}
angular.module('testapp').filter('pagination', function () {
  return function (input, start) {
  start = parseInt(start, 10);
  return input.slice(start);
  };
});

})();