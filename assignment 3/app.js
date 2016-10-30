(function() {
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('menuPath',
'https://davids-restaurant.herokuapp.com/menu_items.json');

function FoundItemsDirective() {
  var ddo = {
    template: "<div class='loader'><ol>    <li ng-repeat='item in list.items'>    Name: {{ item.name }} Short name: {{ item.short_name }}   Descrition: {{ item.description }}    <button type='button' name='button' ng-click='list.onRemove({index: $index})'>    Don\'t want this!    </button>    </li>    </ol>    </div>",
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.found = [];
  list.empty = false;
  list.search = function(searchTerm) {
    if (searchTerm === undefined || searchTerm === '') {
      list.empty = true;
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function(data) {
        list.found = data;
        list.empty = data.length === 0;
      });
  };

  list.remove = function(index) {
    list.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http', 'menuPath'];
function MenuSearchService($http, menuPath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
        method: 'GET',
        url: menuPath
      }).then(function(result) {
        var foundItems = [];
        var data = result.data.menu_items;
        angular.forEach(data, function(element) {
          var description = element.description;
          console.log(searchTerm);
          if (description.indexOf(searchTerm) !== -1) {
            foundItems.push(element);
          }
        });
        return foundItems;
      });
  };
}
})();