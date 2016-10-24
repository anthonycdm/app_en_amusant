angular.module('app', ['ionic','laneolson.ui.dragdrop'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('accueil', {
    url: '/',
    controller:'accueilController',
    controllerAs:'accueilCtrl',
    templateUrl: 'templates/accueil.html'
  })
    .state('chiffres', {
    url: '/chiffres',
    controller:'chiffresController',
    controllerAs:'chiffresCtrl',
    templateUrl: 'templates/chiffres.html'
  })
    .state('chiffres_test', {
    url: '/chiffres_test/{page:int}',
    cache:false,
    controller:'chiffrestestController',
    controllerAs:'chiffrestestCtrl',
    templateUrl: 'templates/chiffres_test.html'
    
  })
  .state('animaux', {
    url: '/animaux/{page:int}',
    cache:false,
    controller:'animauxController',
    controllerAs:'animauxCtrl',
    templateUrl: 'templates/animaux.html'
  })
   .state('animaux2', {
    url: '/animaux2/{page:int}',
    cache:false,
    controller:'animaux2Controller',
    controllerAs:'animaux2Ctrl',
    templateUrl: 'templates/animaux2.html'
  })
  .state('lettres', {
    url: '/lettres',
    cache:false,
    controller:'lettresController',
    controllerAs:'lettresCtrl',
    templateUrl: 'templates/lettres.html'
  })
.state('lettres2', {
    url: '/lettres2/{page:int}',
    cache:false,
    controller:'lettres2Controller',
    controllerAs:'lettres2Ctrl',
    templateUrl: 'templates/lettres2.html'
  })


  $urlRouterProvider.otherwise('/');

})
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})
