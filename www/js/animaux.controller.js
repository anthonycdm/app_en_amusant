angular.module('app')
   .controller('animauxController', function($scope, $ionicHistory, $state, $stateParams,$ionicPopup, $ionicViewSwitcher, $http, $sce, $ionicLoading, $timeout) {
      aC = this;
      aC.popup_active=false;
      var audios = document.getElementsByTagName('audio');
      var pageEnd = 7;
      aC.page = $stateParams.page;
      aC.animauxPlay = function(event) {
         angular.element(event.currentTarget.previousElementSibling.play());
      }

      document.addEventListener('play', function(e) {
         for (var i = 0, len = audios.length; i < len; i++) {
            if (audios[i] != e.target) {
               audios[i].load();
            }
         }
      }, true);
      if (aC.page > pageEnd) {
         $state.go('animaux2', {
            page: 1
         });
      }

      aC.dragEnter = function(draggable, droppable) {

         console.log('drag reussi');
       //  console.log(draggable);
       
console.log(angular.element(droppable)[0])
      }
   
      aC.dragLeave = function(draggable, droppable) {
      }
  
      aC.dragEnd = function(draggable, droppable) {


         if (angular.element(draggable)[0].dragId === angular.element(droppable)[0].dropId ) {

          if(aC.page != pageEnd){
          document.getElementById("bien").play();
            console.log('drag end');
            angular.element(draggable)[0].addClass('hide');
            //angular.element(droppable)[0].addClass('hide');
       if ( document.querySelectorAll('.drag-item.hide').length == 2) {




           aC.showAlert = function() {

            this.popup_active = true;
             $timeout(function() {
                aC.page++;
               $state.go($state.current, {
                  page: aC.page++
               });
                
             }, 2000);
          
         };

         $ionicLoading.show({
               animation: 'fade-in'
            });
         $timeout(function() {
            $ionicLoading.hide();

            aC.showAlert();
         }, 1000);



         

         }

          }


         }
         else{document.getElementById("essaie").play();}
         console.log('drop');
         
      }

      aC.back = function() {
         $ionicViewSwitcher.nextDirection('back');
         $state.go('accueil');
      }

      aC.getAnimaux = function() {
         $http.get('js/animal.json')
            .success(function(data) {

               $timeout(function() {
                  $ionicLoading.hide();
               }, 1000);
               data = data.sort(function() {
                  return 0.5 - Math.random()
               });

               aC.animalData = data.slice(0, 2);
               aC.soundData = aC.animalData;
               aC.soundData =  data.slice(0, 2).sort(function() {
                  return Math.floor(Math.random() *  data.slice(0, 2).length)
               });


              
               console.log(aC.animalData )
               console.log(aC.soundData )

              

            })
            .error(function() {
               console.log('Fichier pas trouvé : animal.json');
            });
      }

   });