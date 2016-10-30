(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    scope: {
      items: "<",
      onRemove: '&'
    },
    templateUrl: 'directives/foundItems.html',
    controller: FoundItemsDirectiveController,
    controllerAs: 'directiveController',
    bindToController: true
  };
  return ddo;
};

function FoundItemsDirectiveController() {
  var directiveController = this;

};

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  var controller = this;
  controller.searchTerm = "";
  controller.found = [];
  controller.noResult = "";

  $scope.$watch('controller.found', function() {
      console.log("updates the found list");
  });

  controller.narrowItDown = function() {
    if(!controller.searchTerm || controller.searchTerm.length === 0) {
      console.log("Nothing to search becaus because given searchTerm not filled");
      controller.noResult = "Nothing found";
      controller.found = [];
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
    promise.then(function(result) {
      controller.found = result;
      controller.noResult = "";
    })
    .catch(function(error) {
      controller.found = [];
      controller.noResult = error;
    });
  };

  controller.checkNothingFound = function () {
    return controller.noResult.length > 0;
  };

  controller.removeItem = function(index) {
    MenuSearchService.removeItem(controller.found, index);
  };
};

MenuSearchService.$inject = ['$q', '$http'];
function MenuSearchService($q, $http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var defferer = $q.defer();

    var httpPromise = doHttpRequest();
    httpPromise.then(function(response) {
      return filterResults(response.data.menu_items, searchTerm);
    }).then(function(response) {
      defferer.resolve(response);
    }).catch(function(error) {
      defferer.reject(error);
    });

    return defferer.promise;
  };

  service.removeItem = function(foundItems, index) {
      foundItems.splice(index, 1);
  };

  function doHttpRequest() {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    });
  };

  function filterResults(menu_items, searchTerm) {
    var deffered = $q.defer();

    var found = [];
    for(var index = 0; index < menu_items.length; index++) {
      var currentItem = menu_items[index];
      if(currentItem.description.indexOf(searchTerm) !== -1) {
        found.push(currentItem);
      }
    }

    console.log("The searched term: " + searchTerm + " found in "
      + found.length + " descriptions");

    if(found.length > 0) {
      deffered.resolve(found);
    } else {
      deffered.reject("Nothing found");
    }
    return deffered.promise;
  };

};

})();