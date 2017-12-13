(function() {

    angular
        .module('airplaneApp')
        .factory('KeyStore', keyStore);

    keyStore.$inject = ['$http'];
    function keyStore($http) {
        var getDarkSkyUrl = function(lat, lon){
            return $http.get('/api/darkskyurl/' + lat + '/' + lon);
        }

        return {
            getKeys: getDarkSkyUrl
        };
    }

})();
