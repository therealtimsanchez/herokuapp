(function () {

  angular.module('airplaneApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    
    console.log("BEING AIRPLANE SERVICES APP - MEAN STACK DRIVEN");
    
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/takeoff/', {
        templateUrl: '/takeoff/takeoff.view.html',
        controller: 'takeoffCtrl',
        controllerAs: 'vm'
      })
      .when('/landing/', {
        templateUrl: '/landing/landing.view.html',
        controller: 'landingCtrl',
        controllerAs: 'vm'
      })
      .when('/climb/', {
        templateUrl: '/climb/climb.view.html',
        controller: 'climbCtrl',
        controllerAs: 'vm'
      })
      .when('/airport/', {
        templateUrl: '/airport/airport.view.html',
        controller: 'airportCtrl',
        controllerAs: 'vm'
      })
      .when('/weather/', {
        templateUrl: '/weather/weather.view.html',
        controller: 'weatherCtrl',
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