(function () {
	'use strict';

	angular.module('MenuCategories')
	.component('categoryList', {
		templateUrl: 'templates/category.list.template.html',
		bindings: {
			items: '<'
		}
	});

	
	
})();