(function () {
	var app = angular.module('contacts-loader', []);

	app.directive('loaderBlock', function () {
		return {
			restrict: 'E',
			templateUrl: 'includes/loader-block.html'
		};
	});
})();
