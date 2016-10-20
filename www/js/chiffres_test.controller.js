angular.module('app')
   .controller('chiffrestestController', function($scope, $window, $ionicHistory, $ionicPopup, $state, $stateParams, $ionicViewSwitcher, $http, $sce, $ionicLoading, $timeout) {


      ctC = this;

      ctC.page = $stateParams.page;
      if (ctC.page > 7) {
         //page = 0;

         document.getElementById("bravo").play();

         ctC.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
               title: 'Félicitations!',
               template: 'Bravo tu as réussi  l\'exercice'
            });

            alertPopup.then(function(res) {
               $state.go('accueil');
            });
         };
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
         ctC.getImgGenerated = function(num) {
            return new Array(num);
         }
         $http.get('js/animal.json')
            .success(function(data) {
               var randomImgChiffres = Math.floor(Math.random() * (data.length - 1) + 1);
               ctC.randomImgChiffres = data[randomImgChiffres].nom;
            })
            .error(function() {
               console.log('Fichier pas trouvé : animal.json');
            });


         $scope.resultat = $scope.chiffre1 + $scope.reponse;


         switch (pos) {

            case 1: // la reponse est la premiere
               console.log('cas 1');
               break;
            case 2: // la reponse est la deuxième
               console.log('cas 2');
               break;
            case 3: // la reponse est la troisième
               console.log('cas 3');
               break;


         }


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

            console.log('drag end');
            draggable.addClass('hide');
            ctC.page++;
            $state.go($state.current, {
               page: ctC.page++
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
         else
            document.getElementById("essaie").play();




      }




      ctC.back = function() {


         $ionicViewSwitcher.nextDirection('back');


         $state.go('accueil');


      }


   });