(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$location', 'UserService', '$scope', '$http', '$filter', '$routeParams'];

    function ProfileController($location, UserService, $scope, $http, $filter, $routeParams) {
        var vm = this;
        vm.profile = profile;
        vm.profile();
        vm.giphy =[];


        function profile() {
            UserService.getGiphyById($routeParams.id).then(function (giphy) {
                console.log("vm",vm.giphy)
                vm.giphy = giphy;
            });
        };
    }

})();