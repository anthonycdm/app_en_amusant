angular.module('app')
   .controller('lettres2Controller', function($scope, $ionicHistory, $ionicPopup,$state, $stateParams, $ionicViewSwitcher, $http, $sce, $ionicLoading, $timeout) {

      lC = this;
      lC.page = $stateParams.page;
      var pageEnd = 7;
      var audios = document.getElementsByTagName('audio');

      lC.back = function() {
         $ionicViewSwitcher.nextDirection('back');
         $state.go('accueil');
      }

      if (lC.page > pageEnd) {

         lC.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
               title: 'Félicitations!',
               template: 'Bravo tu as réussi  l\'exercice'
            });

            alertPopup.then(function(res) {
               $state.go('accueil');
            });
         };
         $timeout(function() {
            lC.showAlert();
         }, 1000);

      }

    
     lC.animauxPlay = function(event) {
         angular.element(event.currentTarget.previousElementSibling.play());

      }
       lC.lettrePlay = function(event) {
         angular.element(event.currentTarget.previousElementSibling.play());

      }
      document.addEventListener('play', function(e) {

         for (var i = 0, len = audios.length; i < len; i++) {
            if (audios[i] != e.target) {
               audios[i].load();
            }

         }
      }, true);
      lC.dragEnter = function(draggable, droppable) {
         /*if (angular.element(draggable)[0].dragId === angular.element(droppable)[0].dropId) {
            console.log('conditoin ok');

            draggable.addClass('hide');

         }*/
         console.log('drop');
         console.log(draggable);
         console.log(droppable);
      }

      lC.dragEnd = function(draggable, droppable) {
       if (draggable.dragId === droppable.dropId && (draggable.dragId != undefined || droppable.dropId != undefined) && (draggable.dragId != null || droppable.dropId != null)) {



                  console.log('drag end');
                  draggable.addClass('hide');
                  lC.page++;
                  $state.go($state.current, {
                     page: lC.page++
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

    
   
      

      

      lC.getAnimaux = function() {

         $http.get('js/animal.json')
            .success(function(data) {

         $timeout(function() {
                  $ionicLoading.hide();
          }, 1000);


         var arr = [];
         while (arr.length < 3) {
            var randomnumber = Math.floor(Math.random() * data.length) + 1;
            var found = false;
            for (var i = 0; i < arr.length; i++) {
               if (arr[i] == randomnumber) {
                  found = true;
                  break
               }
            }
            if (!found) arr[arr.length] = randomnumber;
         }

         console.log(arr);
       
         lC.reponse = data[arr[0]-1];
         lC.solution1 = data[arr[1]-1];
         lC.solution2 = data[arr[2]-1];
         lC.rand_lettres =  lC.reponse.nom.charAt(0);
         while(lC.rand_lettres === lC.solution1.nom.charAt(0) && lC.rand_lettres === lC.solution2.nom.charAt(0)){

                    // lC.reponse = data[arr[0]-1];

         }
         lC.lettre_son = $sce.trustAsResourceUrl('sons/sons_lettres/' + lC.rand_lettres+'.wav');
         lC.reponse_cri=  $sce.trustAsResourceUrl('sons/' + lC.reponse.cri);
         lC.solution1_cri =  $sce.trustAsResourceUrl('sons/' + lC.solution1.cri);
         lC.solution2_cri =  $sce.trustAsResourceUrl('sons/' + lC.solution2.cri);



            })
            .error(function() {
               console.log('Fichier pas trouvé : animal.json');
            });
      }

   });