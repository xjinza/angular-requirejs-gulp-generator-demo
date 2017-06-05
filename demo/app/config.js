/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({
    baseUrl: './',
    paths: {
        'bundle':'app/bundle',
        'angular': 'plugins/angular-1.5.3/angular.min',
        'ui-router': 'plugins/angular-ui-router/angular-ui-router.min',
        'domReady': 'plugins/requirejs-domready/domReady.min',
        'jquery': 'plugins/jquery/jQuery-2.1.4.min',
    },
    deps: [
        
        'app/router', 
        'app/service/service',
        'app/layout/main.controller',
        
    ],
    // 用于gulp打包,bulid时需要把注释去掉。
    // bundles: {
    //     bundle:['angular','ui-router','domReady','jquery']
    // },

    shim: {
        'angular': {
            exports: 'angular',
        },
        
        'ui-router': {
            deps: ['angular']
        },
       
        'domReady':{
            deps: ['require']
        },
       
    },

});