angular.module('app')
.factory('popupstartFactory', function($timeout,$ionicPopup) {
this.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
               template: 'Pour utiliser cette application, veuillez activer le son',
               buttons : [{ text: 'OK' }]
            });

             $timeout(function() {
                alertPopup.close(); 
                
             }, 3000);
           }

             return this;
});
