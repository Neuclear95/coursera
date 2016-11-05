(function () {
	'use strict';

angular.module('MenuCategories')
.controller('CategoryController', CategoryController);

CategoryController.$inject = ['MenuDataService', 'items'];
function CategoryController(MenuDataService, items) {
	
	var categories = this;

	categories.items = items.data;

}

})();