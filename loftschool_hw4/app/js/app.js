(function () {
	var dependencies = [
		'firebase',
		'ngRoute',
		'ngAnimate',
		'contacts-loader',
		'contacts-fields',
		'contacts-functions',
		'contact-page'
	];

	var app = angular.module('contacts', dependencies);

	app
		.config(function($routeProvider) {
			$routeProvider
				.when('/',
					{
						templateUrl: 'includes/contacts-list.html',
						controller: 'ContactsController'
					}
				)
				.when('/add',
					{
						templateUrl: 'includes/add-contact.html',
						controller: 'AddController'
					}
				)
				.when('/contact/:id',
					{
						templateUrl: 'includes/contact-page.html',
						controller: 'ContactController'

					}
				)
				.otherwise({redirectTo: '/'});
		})

		.factory('pageName', function() {
			var title = 'Контакты';

			return {
				getTitle: function () {
					return title;
				},
				setTitle: function (newTitle) {
					title = newTitle;
				}
			};
		})
		.factory('gridType', function () {
			var type = 'line';

			return {
				setType: function (newType) {
					type = newType;
				},
				isActive: function (checkType) {
					return type === checkType;
				}
			};
		})

		.controller('MainController', ['$scope', 'pageName', 'gridType', function ($scope, pageName, gridType) {
			//Init
			$scope.pageName = pageName;
			$scope.gridType = gridType;

		} ])

		.controller('FunctionsController', ['$scope', '$route', '$location', 'gridType', function ($scope, $route, $location, gridType) {
			//Init
			this.grid = gridType;

			this.isList = function () {
				return $location.path() === '/';
			};

			this.isAdd = function () {
				if ($location.path().match(/contact/g) !== null) {
					return $location.path().match(/contact/g).length > 0;
				} else {
					return $location.path() === '/add';
				}
			};

		} ])

		.controller('ContactsController', ['$firebase', '$scope', '$location', 'pageName', 'gridType', function ($firebase, $scope, $location, pageName, gridType) {
			var self = this,
				ref = new Firebase('https://contacst-manage.firebaseio.com/'),
				sync = $firebase(ref),
				loader = {
					show: function () {
						self.loading = true;
					},
					del: function () {
						self.loading = false;
					}
				},
				success = function () {
					console.info('Готово');
					self.nodata = false;
					loader.del();
				},
				failure = function () {
					self.nodata = true;
					console.warn('Невозможно получить данные');
				};

			//Init
			pageName.setTitle('Контакты');
			self.data = [];
			self.grid = gridType;

			self.getData = function () {
				loader.show();
				
				self.data = sync.$asArray();

				self.data.$loaded(success, failure);
			};

			self.ifData = function () {
				return this.data.length > 0;
			};

			self.showContact = function (id) {
				$location.path('contact/' + id);
			};

			self.filter = function (e, type) {
				e.preventDefault();

				switch (type) {
					case 'num':
						console.log(type);
						break;
					case 'name':
						console.log(type);
						break;
					case 'surname':
						console.log(type);
						break;
					case 'phone':
						console.log(type);
						break;
					case 'email':
						console.log(type);
						break;
					default:
						console.log('none');
						break;
				}
			};
		}])

		.controller('AddController', ['$scope', '$firebase', '$location', 'pageName', function ($scope, $firebase, $location, pageName) {
			//Init
			pageName.setTitle('Контакт');
			this.contact = {};
			this.added = false;
			this.deleted = false;
			this.error = false;
			this.newUser = '';

			var self = this,
				ref = new Firebase('https://contacst-manage.firebaseio.com/'),
				sync = $firebase(ref),
				success = function (data) {
					self.added = true;
					self.newUser = data.path.n[0];

					$location.path('/contact/' + self.newUser);
				};

			this.submitError = function (formName) {
				if (formName.$invalid) {
					this.error = true;
				} else {
					this.error = false;
				}
			};

			this.pushContact = function (contact, formName) {
				contact.thumb = "images/thumb-big.jpg";

				sync
					.$push(contact)
					.then(success);

				// Reset Form
				this.contact = {};
				formName.$setPristine();
			};

			this.resetContact = function (formName) {
				this.contact = {}; //Reset Data
				formName.$setPristine(); //Reset Valid Classes
			};

			// this.deleteContact = function () {
			// 	if (self.newUser !== '') {
			// 		var itemRef = new Firebase('https://contacst-manage.firebaseio.com/' + self.newUser),
			// 			deleted = function (error) {
			// 				self.added = false;
			// 				self.deleted = true;
			// 			};

			// 		itemRef.remove(deleted);

			// 		this.contact = {};
			// 	} else {
			// 		console.info('Пользователь не указан');
			// 	}
			// };
		} ])

		.controller('ContactController', ['$scope', '$firebase', '$location', '$route', '$routeParams', 'pageName', function ($scope, $firebase, $location, $route, $routeParams, pageName) {
			var self = this,
				id = $routeParams.id,
				baseUrl = 'https://contacst-manage.firebaseio.com/',
				contactsRef = new Firebase(baseUrl),
				ref = null, //Firebase Reference
				sync = null, //Firebase Sync
				success = function (data) {
					self.userData = {
						name: data.name,
						surname: data.surname,
						email: data.email,
						phone: data.phone || '',
						thumb: data.thumb || ''
					};

					pageName.setTitle( self.userData.name + ' ' + self.userData.surname);
				},
				failure = function () {
					console.warn('Невозможно получить данные пользователя');
				},
				retrieve = function () {
					ref = new Firebase(baseUrl + id);
					sync = $firebase(ref);

					self.userData = sync.$asObject();
					self.userData.$loaded(success, failure);
				},
				isDeleted = function(error) {
					self.userData = {};

					jQuery('.btn--back').trigger('click');
				},
				ifExist = function (userID) {
					var dfd = $.Deferred(),
						wait = true,
						resolving = function () {
							if ( self.exist ) {
								dfd.resolve();
							} else {
								dfd.reject();
							}
						};

					contactsRef.child(userID).once('value', function (snapshot) {
						self.exist = ( snapshot.val() !== null );
						wait = false;
					});

					//Wait while we load data from firebase
					setTimeout(function waiting () {
						if (wait) {
							console.log('Загружаем данные');
							setTimeout(waiting, 500);
						} else {
							clearTimeout(waiting);
							resolving();
						}
					}, 500);

					return dfd.promise();
				};

			//Init
			this.readonly = true;
			this.exist = false;
			this.deleted = false;
			
			this.edit = function ($event) {
				$event.preventDefault();

				this.readonly = false;
			};

			this.saveInfo = function () {
				this.readonly = true;
			};

			this.updateContact = function (contact) {
				pageName.setTitle( contact.name + ' ' + contact.surname);
				ref.update(contact);
			};

			this.deleteContact = function ($event) {
				$event.preventDefault();

				var ref = new Firebase(baseUrl + id);
				self.deleted = true;

				ref.remove(isDeleted);
			};

			ifExist(id)
			.then(
				function () {
					retrieve();
				},
				function () {
					console.info('User doesn\'t exist!');
				}
			);

		} ]);

})();