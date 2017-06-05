define(["../app"], function(controllers) {
	controllers.controller("welcomeController", [
		"$scope",
		"$rootScope",

		function(
			$scope,
			$rootScope,

		) {
			var vm = this;
			vm.name="David";
		}
	])

});