(function () {
	'use strict';


angular.module('MenuCategories')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
	// Redirect to home page if no other URL matches
	$urlRouterProvider.otherwise('/');

	// *** Set up UI states ***
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'templates/home.template.html'
	})
   .state('categories', {
   	url: '/categories',
   	templateUrl: 'templates/categories.template.html',
   	controller: 'CategoryController as categories',
	resolve: {
   		items: ['MenuDataService', function (MenuDataService) {
   			return MenuDataService.getAllCategories();
   		}]
   	}
   })
 .state('items', {
 	url: '/items/{category}',
 	templateUrl: 'templates/items.template.html',
 	controller: 'ItemController as menuItems',
 	resolve: {
 		items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
 			console.log($stateParams);
 			return MenuDataService.getItemsForCategory($stateParams.category);
 		}]
 	}
 })


}

})();