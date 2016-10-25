angular.module('app')
   .controller('animaux2Controller', function($scope, $ionicHistory, $ionicPopup, $state, $stateParams, $ionicViewSwitcher, $http, $sce, $ionicLoading, $timeout) {
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

        document.getElementById("bravo").play();

         aC.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
               title: 'Félicitations!',
               template: 'Bravo tu as réussi  l\'exercice'
            });

            alertPopup.then(function(res) {
               $state.go('accueil');
            });
         };
         $timeout(function() {
            aC.showAlert();
         }, 1000);
      }

      aC.dragEnter = function(draggable, droppable) {
         console.log('dragenter');
         console.log(draggable);
         console.log(droppable);
      }

      aC.dragEnd = function(draggable, droppable) {



         if (angular.element(draggable)[0].dragId === angular.element(droppable)[0].dropId ) {

          if(aC.page != pageEnd){
          document.getElementById("bien").play();
            console.log('drag end');
            angular.element(draggable)[0].addClass('hide');
            //angular.element(droppable)[0].addClass('hide');
       if ( document.querySelectorAll('.drag-item.hide').length == 3) {




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
               //console.log('Data avant sort : ', data);

               $timeout(function() {
                  $ionicLoading.hide();
               }, 1000);
               data = data.sort(function() {
                  return 0.5 - Math.random()
               });

               aC.animalData = data.slice(0, 3);
               aC.soundData = aC.animalData;
               aC.soundData =  data.slice(0, 3).sort(function() {
                  return Math.floor(Math.random() *  data.slice(0, 3).length)
               });


              
               console.log(aC.animalData )
               console.log(aC.soundData )


               
            })
            .error(function() {
               console.log('Fichier pas trouvé : animal.json');
            });
      }



   });