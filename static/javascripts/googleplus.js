(function () {
    'use strict';

    angular
        .module('googleplus', [
            'googleplus.routes',
            'googleplus.authentication',
            'googleplus.config',
            'googleplus.layout',
            'googleplus.posts'
        ]);

    angular
        .module('googleplus.routes', ['ngRoute']);

    angular
        .module('googleplus.config', []);

    angular
        .module('googleplus')
        .run(run);

    run.$inject = ['$http'];

    // update xsrf headers to align with Django's defaults
    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();