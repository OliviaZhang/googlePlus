(function () {
    'use strict';

    angular
        .module('googleplus.posts.directives')
        .directive('post', post);

    function post() {
        var directive = {
            controller: 'PostsController',
            controllerAs: 'vm',
            restrict: 'E', // match with element, in this case post
            scope: {
                post: '='
            },

            templateUrl: '/static/templates/posts/post.html'
        };

        return directive;
    }
})();