(function () {
    'use strict';

    angular
        .module('googleplus.posts', [
            'googleplus.posts.controllers',
            'googleplus.posts.directives',
            'googleplus.posts.services'
        ]);

    angular
        .module('googleplus.posts.controllers',[]);

    angular
        .module('googleplus.posts.directives', ['ngDialog']);

    angular
        .module('googleplus.posts.services', []);

})();