(function () {
    'use strict';

    angular
        .module('googleplus.authentication.services')
        .factory('Authentication', Authentication); // register a service authentication on the module

    Authentication.$inject = ['$cookies', '$http']; // inject the 2 services as dependencies

    function Authentication($cookies, $http) {


        var Authentication = {
            register:register, // define your service as a named object and then return it
            login: login,
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };


        return Authentication;

        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
               username: username,
               password: password,
               email: email
            });
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
               email: email,
               password: password
            });
        }

        /* return the currently authenticated account */
        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }
            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }
    }
})();