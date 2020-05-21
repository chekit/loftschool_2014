(function () {
	var app = angular.module('contacts-functions', []);

	app.directive('functions', function () {
		return {
			restrict: 'E',
			templateUrl: 'includes/functions.html'
		};
	});
})();