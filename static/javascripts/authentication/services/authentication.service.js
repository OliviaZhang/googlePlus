(function () {
    'use strict';

    angular
        .module('googleplus.authentication.services')
        .factory('Authentication', Authentication); // register a service authentication on the module

    Authentication.$inject = ['$cookies', '$http']; // inject the 2 services as dependencies

    function Authentication($cookies, $http) {
        var Authentication = {
            register:register // define your service as a named object and then return it
        };

        return Authentication;
    }

    function register(email, password, username) {
        return $http.post('/api/v1/accounts/', {
           username: username,
           password: password,
           email: email
        });
    }
})();