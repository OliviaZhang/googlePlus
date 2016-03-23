(function () {
    'use strict';

    angular
        .module('googleplus', [
            'googleplus.routes',
            'googleplus.authentication'
        ]);

    angular
        .module('googleplus.routes', ['ngRoute']);

    angular
        .module('googleplus.config', []);
})();