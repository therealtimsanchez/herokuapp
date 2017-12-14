(function () {

  angular.module('airplaneApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    
    
    
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/tasks/', {
        templateUrl: '/climb/climb.view.html',
        controller: 'climbCtrl',
        controllerAs: 'vm'
      })
      .when('/people/', {
        templateUrl: '/airport/airport.view.html',
        controller: 'airportCtrl',
        controllerAs: 'vm'
      })
         
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(
      {
        enabled: true,
        requireBase: false,
        rewriteLinks: true
      }
    );
  }

  angular
    .module('airplaneApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();