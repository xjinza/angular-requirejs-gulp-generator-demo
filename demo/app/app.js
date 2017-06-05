/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'domReady',
    'ui-router',
], function() {
    'use strict';
    var _module = angular.module;
    angular.module = function() {
        var newModule = _module.apply(angular, arguments);

        if (arguments.length >= 2) {
            newModule.config([
                '$controllerProvider',
                '$compileProvider',
                '$filterProvider',
                '$provide',
                function($controllerProvider, $compileProvider, $filterProvider, $provide) {
                    newModule.controller = function() {

                        $controllerProvider.register.apply(this, arguments);
                        return this;
                    };
                    newModule.directive = function() {
                        $compileProvider.directive.apply(this, arguments);
                        return this;
                    };
                    newModule.filter = function() {
                        $filterProvider.register.apply(this, arguments);
                        return this;
                    };
                    newModule.factory = function() {
                        $provide.factory.apply(this, arguments);
                        return this;
                    };
                    newModule.service = function() {
                        $provide.service.apply(this, arguments);
                        return this;
                    };
                    newModule.provider = function() {
                        $provide.provider.apply(this, arguments);
                        return this;
                    };
                    newModule.value = function() {
                        $provide.value.apply(this, arguments);
                        return this;
                    };
                    newModule.constant = function() {
                        $provide.constant.apply(this, arguments);
                        return this;
                    };
                    newModule.decorator = function() {
                        $provide.decorator.apply(this, arguments);
                        return this;
                    };
                }
            ]);
        }
        return newModule;
    };
    var app = angular.module('app', [
        'ui.router'

    ]);

    require(['domReady!'], function(document) {

        angular.bootstrap(document, ['app']);
    });

    return app;
});