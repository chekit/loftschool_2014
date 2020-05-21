(function () {
	var app = angular.module('contact-page', []);

	app.directive('contactPage', function () {
		return {
			restrict: 'E',
			templateUrl: 'includes/contact-page.html'
		};
	});
})();