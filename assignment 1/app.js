(function () {
	"use strict";
	var app = angular.module("myApp", [])

	app.controller("myController", function ($scope){
        $scope.prodArr = "";
        $scope.result = ""; 
        $scope.finalArr = [];     
        $scope.slicer = function () {
        	var re = /\s*,\s*/;
        	var newArr = $scope.prodArr.split(re);
        	console.log(newArr);
        	for (var i = 0; i < newArr.length; i++) {
        		if(newArr[i] !== "") {
        			$scope.finalArr.push(newArr[i]);        			      			
        		}
        	}	
        	console.log(newArr);   
        	console.log($scope.finalArr);     	
        	if ($scope.prodArr == "") {
        		$scope.result = "Enter data first."
        	}
        	else if ($scope.finalArr.length <= 3) {
        		$scope.result = "Enjoy!";
        	}
        	else {
        		$scope.result = "Too much!";
        	}
        	
        };
	});
	
})();