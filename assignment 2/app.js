(function () {
				'use strict';

				angular.module('ShoppingListCheckOff', [])
				.controller('ToBuyController', ToBuyController)
				.controller('AlreadyBoughtController', AlreadyBoughtController)
				.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

				ToBuyController.$inject = ['ShoppingListCheckOffService'];
				function ToBuyController(ShoppingListCheckOffService){
								var shoppingList = this;
								shoppingList.items = ShoppingListCheckOffService.getUnboughtItems();
								shoppingList.buyItem = function(itemId){
												ShoppingListCheckOffService.buyItem(itemId);
												shoppingList.items = ShoppingListCheckOffService.getItems();//getUnboughtItems();
								};
				}

				AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
				function AlreadyBoughtController(ShoppingListCheckOffService){
								var alreadyBoughtList = this;
								alreadyBoughtList.items = ShoppingListCheckOffService.getItems();//getBoughtItems();
				}

				function ShoppingListCheckOffService(){
								var service = this;
								var items = [
								{"id": 1, "name": "cookies", "quantity": 2, "bought": false},
								{"id": 2,"name": "cola", "quantity": 3, "bought": false},
								{"id": 3,"name": "bread", "quantity": 5, "bought": false},
								{"id": 4,"name": "chips", "quantity": 7, "bought": false},
								{"id": 5,"name": "beer", "quantity": 11, "bought": false}
								];

								service.buyItem = function(itemId){
												
												var itemIndex = items.findIndex(function(item){
																return item.id == itemId;
												});
												if(itemIndex !== -1){
																items[itemIndex].bought = true;
												}
								}
								service.getItems = function(){
												return items;
								};

								service.getBoughtItems = function(){
												var filtered = items.filter(function(item){
																try{
																				return item.bought === true;
																}
																catch(error){
																				return false;
																}
												});
												return filtered;
								};

								service.getUnboughtItems = function(){
												var filtered = items.filter(function(item){
																try{
																				return item.bought === false;
																}
																catch(error){
																				return false;
																}
												});
												return filtered;
								};

				}
})();
