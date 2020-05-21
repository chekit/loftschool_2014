(function () {
	var app = angular.module('contacts-fields', []);
	
	app.directive('contactFields', function () {
		return {
			restrict: 'E',
			templateUrl: 'includes/contact-fields.html'
		};
	});
})();
