(function () {
    'use strict';
    // controllers and services are authentication's dependencies
    angular
        .module('googleplus.authentication', [
            'googleplus.authentication.controllers',
            'googleplus.authentication.services'
        ]);

    angular
        .module('googleplus.authentication.controllers', []);

    angular
        .module('googleplus.authentication.services', ['ngCookies']);
})