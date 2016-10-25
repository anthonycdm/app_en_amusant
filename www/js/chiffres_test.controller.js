angular.module('app')
   .controller('chiffrestestController', function($scope, $window, $ionicHistory, $ionicPopup, $state, $stateParams, $ionicViewSwitcher, $http, $sce, $ionicLoading, $timeout) {


      ctC = this;
      ctC.popup_active = false;
      ctC.page = $stateParams.page;
      if (ctC.page > 7) {
         //page = 0;

         document.getElementById("bravo").play();

            var alertPopup = $ionicPopup.alert({
               title: 'Félicitations!',
               template: 'Bravo tu as réussi  l\'exercice'
            });

            alertPopup.then(function(res) {
               $state.go('accueil');
            });
         $timeout(function() {
            ctC.showAlert();
         }, 1000);

      }

      ctC.getChiffres = function() {



         var pos = Math.floor(Math.random() * 3) + 1;

         ctC.page = $stateParams.page;


         var arr = [];
         while (arr.length < 4) {
            var randomnumber = Math.floor(Math.random() * 5) + 1;
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
         $scope.chiffre1 = arr[0];
         $scope.reponse = arr[1];
         $scope.solution1 = arr[2];
         $scope.solution2 = arr[3];
         var pos_array = [arr[1],arr[2],arr[3]];

         pos_array = pos_array.sort(function() {
                  return Math.floor(Math.random() *  pos_array.length);
               });
         ctC.pos_array = pos_array;
         ctC.getImgGenerated = function(num) {
            return new Array(num);
         }
         var dragIdArray = new Array();
         dragIdArray[pos_array.indexOf(arr[1])] = 'reponse';
         dragIdArray[pos_array.indexOf(arr[2])] = 'solution1';
         dragIdArray[pos_array.indexOf(arr[3])] = 'solution2'; 
         ctC.dragIdArray = dragIdArray;

         console.log('Pos Array '+ pos_array);
         console.log(ctC.dragIdArray)
         console.log(pos_array.indexOf(arr[3]));

         
        
         $http.get('js/animal.json')
            .success(function(data) {
               var randomImgChiffres = Math.floor(Math.random() * (data.length - 1) + 1);
               ctC.randomImgChiffres = data[randomImgChiffres].nom;
            })
            .error(function() {
               console.log('Fichier pas trouvé : animal.json');
            });


         $scope.resultat = $scope.chiffre1 + $scope.reponse;


   


      }


      ctC.dragEnter = function(draggable, droppable) {

         console.log('dragenter');
         console.log(draggable);
         console.log(droppable);




      }

      ctC.dragEnd = function(draggable, droppable) {

         if (draggable.dragId === droppable.dropId && (draggable.dragId != undefined || droppable.dropId != undefined) && (draggable.dragId != null || droppable.dropId != null)) {

            if(ctC.page != 7)
            document.getElementById("bien").play();
            this.popup_active = true;  

             $timeout(function() {                            
                  console.log('drag end');
                  draggable.addClass('hide');
                  ctC.page++;
                  $state.go($state.current, {
                     page: ctC.page++
                  });
                  }, 1000);   

                  $ionicLoading.show({
                     animation: 'fade-in'
                  });

                  $timeout(function() {
                     $ionicLoading.hide();
                  }, 1000);
          
                  console.log(draggable);
                  console.log(droppable);

                   
         }
         else{
            document.getElementById("essaie").play();
            angular.element(document.querySelector(".drop-spot.reponse")).css({'background':'#f00'})
               console.log(draggable);

            $timeout(function() {
             angular.element(document.querySelector(".drop-spot.reponse")).css({'background':'none'})
             $timeout(function() {
               angular.element(document.querySelector(".drag-item.solution1")).css({'transform':'translate(0px,0px)'})
               angular.element(document.querySelector(".drag-item.solution2")).css({'transform':'translate(0px,0px)'})

         }, 1000);


         }, 1000);

         }




      }




      ctC.back = function() {


         $ionicViewSwitcher.nextDirection('back');


         $state.go('accueil');


      }


   });