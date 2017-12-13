(function() {

    angular
        .module('airplaneApp')
        .service('DarkskyWeather', darkskyWeather);

    darkskyWeather.$inject = ['$http'];

    function darkskyWeather($http) {
        var getWeather = function(lat, lon) {
            //darkskyapi/:lat/:lon
            return $http.get('/api/darkskyapi' + '/' + lat + '/' + lon);
        };
        
        return {
            getWeather: getWeather,
        };
    }
})();
