(function() {

  angular
    .module('airplaneApp')
    .service('AirportData', airportData);

  airportData.$inject = ['$http'];
  function airportData ($http) {
      var getAirports = function(){
          return $http.get('/api/airportdata');
      }

      return {
          getAirports : getAirports,
      };
  }

})();