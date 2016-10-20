angular.module('app')
.controller('lettresController', function($scope, $ionicHistory, $state, $ionicViewSwitcher) {

  lC = this;
  lC.back = function() {
  		$ionicViewSwitcher.nextDirection('back');
		$state.go('accueil');
	}

	$scope.rand_lettres = String.fromCharCode(65+(Math.floor(Math.random() * 26)+1));

	lC.drop = function(draggable, droppable) {
		               /* console.log('conditoin ok');*/
            if(angular.element(draggable)[0].dragId === angular.element(droppable)[0].dropId){
            	console.log("k,,n");
            	//$state.go('lettres2',{page:1});
           }
        }

      lC.dragEnd = function(draggable, droppable) {
         
           if(angular.element(draggable)[0].dragId === angular.element(droppable)[0].dropId){
                    console.log('drag end');
                //draggable.addClass('hide');
             //   lC.page++;
                $state.go('lettres2',{page:1});

                    $ionicLoading.show({
                        animation: 'fade-in'
                    });

                     $timeout(function() {
                            $ionicLoading.hide();
                        }, 1000);
                     location.reload();             
           }
            console.log('drop');
            console.log(draggable);
             console.log(droppable);
        }
 
 });
