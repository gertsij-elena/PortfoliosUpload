(function () {
    'use strict';

    angular
        .module('testapp')
        .factory('passIdService' +
            '', factory);

   factory.$inject = ['$window'];

    function factory($window) {
        var key = 'App.SelectedValue';

        var addData = function (newObj) {
       
            var mydata = [];
            mydata.push(newObj);
            $window.sessionStorage.setItem(key, JSON.stringify(mydata));
           
        };

        var getData = function () {
            var mydata = $window.sessionStorage.getItem(key);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata;
        };

        return {
            addData: addData,
            getData: getData
        };
}
})();