angular.module('app')
.controller('chiffresController', function($scope, $ionicHistory,$state, $ionicViewSwitcher) {

  cC = this;
  $scope.image1 = "cochon.png";
 
 cC.next = function() {
    $state.go('chiffres_test',{page:1});
  }
  cC.back = function() {
  	  	$ionicViewSwitcher.nextDirection('back');
		$state.go('accueil');
		
	}
 
 });
