(function () {
	'use strict';

	angular.module('MenuCategories')
	.component('itemList', {
		templateUrl: 'templates/item.list.template.html',
		bindings: {
			items: '<'
		}
	});

	

})();