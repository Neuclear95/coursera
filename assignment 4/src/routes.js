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
		template: '<h2>Please click the link below to view our categories</h2><p><a ui-sref="categories">Categories</a></p>'
	})
   .state('categories', {
   	url: '/categories',
   	template: '<h1>Resturant Categories</h1><category-list items="categories.items"></category-list>',
   	controller: 'CategoryController as categories',
	resolve: {
   		items: ['MenuDataService', function (MenuDataService) {
   			return MenuDataService.getAllCategories();
   		}]
   	}
   })
 .state('items', {
 	url: '/items/{category}',
 	template: '<item-list items="menuItems.items"></item-list>',
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