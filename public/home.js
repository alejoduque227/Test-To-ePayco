(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', 'UserService', '$scope', '$http', '$filter', 'ngTableParams', 'TableService'];

    function HomeController($location, UserService, $scope, $http, $filter,ngTableParams, TableService) {
        var vm = this;
        vm.giphys = giphys;
        vm.giphys();

        function giphys() {
            UserService.getGiphy().then(function (giphys) {
                $scope.giphys = giphys;
                $scope.total = $scope.giphys.length;
                $scope.tableParams = new ngTableParams({page:1, count:10, sorting: { id: 'asc'}}, {
                    total: $scope.giphys.length,
                    getData: function($defer, params) {
                        TableService.getTable($defer,params,$scope.filter, $scope.giphys);
                    }
                });
                $scope.tableParams.reload();
                $scope.$watch("filter.$", function () {
                    $scope.tableParams.reload();
                });
            });
        };
    }

})();