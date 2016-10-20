angular.module('app')
   .controller('animaux2Controller', function($scope, $ionicHistory, $ionicPopup, $state, $stateParams, $ionicViewSwitcher, $http, $sce, $ionicLoading, $timeout) {
      aC = this;
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

         if (draggable.dragId === droppable.dropId && (draggable.dragId != undefined || droppable.dropId != undefined) && (draggable.dragId != null || droppable.dropId != null)) {



            console.log('drag end');
            draggable.addClass('hide');
            aC.page++;
            $state.go($state.current, {
               page: aC.page++
            });

            $ionicLoading.show({
               animation: 'fade-in'
            });



            $timeout(function() {
               $ionicLoading.hide();
            }, 1000);

            console.log(draggable);
            console.log(droppable);

         }




      }


      aC.back = function() {


         $ionicViewSwitcher.nextDirection('back');


         $state.go('accueil');


      }

      aC.getAnimaux = function() {
         $http.get('js/animal.json')
            .success(function(data) {
               console.log('Data avant sort : ', data);

               $timeout(function() {
                  $ionicLoading.hide();
               }, 1000);
               data = data.sort(function() {
                  return 0.5 - Math.random()
               });

               aC.animalData = data;
               console.log('Data après sort : ', data);

               

               /*  var nombre1 = Math.floor(Math.random() * data.length),
                     nombre2 = Math.floor(Math.random() * data.length),
                     random_boolean = Math.random() >= 0.5 ? 0 : 1,
                     id_son1 = document.querySelector('.animal1'),
                     id_son2 = document.querySelector('.animal2');



                 console.log(random_boolean);
                 console.log(id_son1);
                 while (nombre1 === nombre2) {

                     nombre2 = Math.floor(Math.random() * data.length);

                 }


                 aC.animal1 = data[nombre1].nom;
                 aC.animal2 = data[nombre2].nom;
                 aC.son1 = $sce.trustAsResourceUrl('sons/' + data[nombre1].cri);
                 aC.son2 = $sce.trustAsResourceUrl('sons/' + data[nombre2].cri);

                  if (random_boolean === 1){

                     id_son1.className += ' reverse';
                     var sounds = document.querySelector('.sound_container');
                     sounds.insertBefore(id_son2,id_son1);
                     
                 }
                 else if (random_boolean === 0){


                     id_son1.className = 'drop-spot animal1';
                     

                 }*/

            })
            .error(function() {
               console.log('Fichier pas trouvé : animal.json');
            });
      }



   });