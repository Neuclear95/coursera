(function () {
	'use strict';

	angular.module('MenuCategories')
	.controller('ItemController', ItemController);

	ItemController.$inject = ['MenuDataService', 'items'];
	function ItemController(MenuDataService, items) {
		var menuItems = this;

		menuItems.items = items.data.menu_items;
	}

})();
