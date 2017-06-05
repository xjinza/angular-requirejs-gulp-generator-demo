define(["./app"], function(app) {

    app.config([
        "$stateProvider",
        "$urlRouterProvider",
        "$httpProvider",
        function($stateProvider, $urlRouterProvider, $httpProvider) {

            $urlRouterProvider.otherwise("/login");
            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "app/login/welcome.html",
                    controller: "welcomeController",
                    controllerAs: "vm",
                    resolve: {
                        load: loadDeps([
                            "app/login/welcome.controller"
                        ])
                    }
                })

            function loadDeps(deps) {
                return [
                    "$q",
                    function($q) {
                        var def = $q.defer();
                        require(deps, function() {
                            def.resolve();
                        });
                        return def.promise;
                    }
                ];
            }
        }
    ]);
});
