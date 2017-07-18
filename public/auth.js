(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, UserService) {
        var service = {};

        service.Login = Login;

        return service;

        function Login(email, password, callback) {



            $http.post('http://localhost:8000/login', { email: email, password: password })
                .then(function (response) {
                    callback(response);
                });

        }

    }

})();