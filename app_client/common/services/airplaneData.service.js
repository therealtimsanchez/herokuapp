(function() {

    angular
        .module('airplaneApp')
        .service('AirplaneData', airplaneData);

    airplaneData.$inject = ['$http'];

    function airplaneData($http) {
        var getClimbData = function() {
            return $http.get('/api/climbData');
        }

        var getClimbDataForWeight = function(weight) {
            return $http.get('/api/climbData/' + weight);
        }
        
        var getLandingDataForWeight = function(weight) {
            return $http.get('/api/climbData/' + weight);
        }        

        return {
            getClimbData: getClimbData,
            getClimbDataForWeight : getClimbDataForWeight
        };
    }
})();
