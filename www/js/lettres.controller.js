angular.module('app')
.controller('lettresController', function($scope, $ionicHistory, $state, $ionicViewSwitcher,$timeout, $ionicLoading) {

  lC = this;
  lC.back = function() {
  		$ionicViewSwitcher.nextDirection('back');
		$state.go('accueil');
	}

  lC.lettreplay = function() {
    var audio = document.getElementById('sons_lettre');
        audio.play();
  }

   lC.animauxPlay = function() {
    var audio = document.getElementById('audio_ex');
        audio.play();
  }


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
        }
 
 });
