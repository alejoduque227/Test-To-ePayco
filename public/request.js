(function () {
    'use strict';
    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        var server = 'http://localhost:8000';

        service.getGiphy = getGiphy;


        return service;

        function getGiphy() {
            return $http.get(server+'/giphy').then(handleSuccess, handleError('Error getting Data'));
        }

    // private functions

        function handleSuccess(response) {
            return response.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();