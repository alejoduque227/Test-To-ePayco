(function () {
    'use strict';

    angular
        .module('app', ['ngTable','ngRoute', 'ngCookies'])
        .config(config)
        .service('TableService', function ($http, $filter) {

            function filterData(data, filter){
                return $filter('filter')(data, filter)
            }

            function orderData(data, params){
                return params.sorting() ? $filter('orderBy')(data, params.orderBy()) : filteredData;
            }

            function sliceData(data, params){
                return data.slice((params.page() - 1) * params.count(), params.page() * params.count())
            }

            function transformData(data,filter,params){
                return sliceData( orderData( filterData(data,filter), params ), params);
            }
            var service = {
                cachedData:[],
                getTable:function($defer, params, filter, data){

                    if (service.cachedData.length>0) {
                        service.cachedData = data;
                        var filteredData = filterData(service.cachedData,filter);
                        var transformedData = sliceData(orderData(filteredData,params),params);
                        params.total(filteredData.length)
                        $defer.resolve(transformedData);
                    }
                    else {
                        angular.copy(data,service.cachedData)
                        params.total(data.length)
                        var filteredData = $filter('filter')(data, filter);
                        var transformedData = transformData(data,filter,params)
                        $defer.resolve(transformedData);
                    }
                }
            };
            return service;
        });
    //.run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }


    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();