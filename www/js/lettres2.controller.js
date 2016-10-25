angular.module('app')
   .controller('lettres2Controller', function($scope, $ionicHistory,$ionicPopup, $state, $stateParams, $ionicViewSwitcher, $http, $sce, $ionicLoading, $timeout) {

      lC = this;
      lC.page = $stateParams.page;
      var pageEnd = 7;
      var audios = document.getElementsByTagName('audio');

      lC.back = function() {
         $ionicViewSwitcher.nextDirection('back');
         $state.go('accueil');
      }

      if (lC.page > pageEnd) {

         document.getElementById("bravo").play();

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

                  if(lC.page != 7){
                     document.getElementById("bien").play();
                 
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
               else{
                  document.getElementById("essaie").play();
                     $timeout(function() {
               angular.element(document.querySelector(".drag-item.solution1")).css({'transform':'translate(0px,0px)'})
               angular.element(document.querySelector(".drag-item.solution2")).css({'transform':'translate(0px,0px)'})

         }, 2000);

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

          var pos_array = [data[arr[0]-1],data[arr[1]-1],data[arr[2]-1]];

         pos_array = pos_array.sort(function() {
                  return Math.floor(Math.random() *  pos_array.length);
               });
         lC.pos_array = pos_array;
         lC.getImgGenerated = function(num) {
            return new Array(num);
         }
         var dragIdArray = new Array();
         dragIdArray[pos_array.indexOf(data[arr[0]-1])] = 'reponse';
         dragIdArray[pos_array.indexOf(data[arr[1]-1])] = 'solution1';
         dragIdArray[pos_array.indexOf(data[arr[2]-1])] = 'solution2'; 
         lC.dragIdArray = dragIdArray;

         console.log('Pos Array '+ pos_array[0].nom,pos_array[1].nom,pos_array[2].nom);
         console.log(lC.dragIdArray)
       //  console.log(pos_array.indexOf(arr[3]));



        /* while(lC.rand_lettres === lC.solution1.nom.charAt(0) && lC.rand_lettres === lC.solution2.nom.charAt(0)){

            for (var i = 0; i < arr.length; i++) {
               if (arr[i] == randomnumber) {
                  found = true;
                  break
               }
            }
            if (!found) arr[arr.length] = randomnumber;
             lC.reponse = data[arr[0]-1];
             lC.rand_lettres =  lC.reponse.nom.charAt(0);
             console.log('into the while')


         }*/
       
            })
            .error(function() {
               console.log('Fichier pas trouvé : animal.json');
            });
      }

   });