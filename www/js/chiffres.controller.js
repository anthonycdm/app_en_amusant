angular.module('app')
.controller('chiffresController', function($scope, $ionicHistory,$state, $ionicViewSwitcher,$timeout) {

  cC = this;
  $scope.image1 = "cochon.png";
 
 cC.next = function() {
    $state.go('chiffres_test',{page:1});
  }



  $timeout(function() {

      cC.next();
   }, 7000);

  cC.back = function() {
  	  	$ionicViewSwitcher.nextDirection('back');
		$state.go('accueil');
		
	}
 
 });
