(function () {
	'use strict';

	angular.module('MenuCategories')
	.component('itemList', {
		template: '<ul>	<li ng-repeat="item in $ctrl.items">{{item.short_name}} {{item.name}}</li></ul>',
		bindings: {
			items: '<'
		}
	});

	

})();