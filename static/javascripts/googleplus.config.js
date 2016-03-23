(function () {
    'use strict';

    angular
        .module('googleplus.config')
        .config(config);

    config.$inject = ['$locationProvider'];

    // enable html5 routing
    function config($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
})();