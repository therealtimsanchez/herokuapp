(function() {

    angular
        .module('airplaneApp')
        .controller('landingCtrl', landingCtrl);

    landingCtrl.$inject = ['$scope', 'SelectedData', 'AirplaneData'];

    function landingCtrl($scope, SelectedData, AirplaneData) {
        // Nasty IE9 redirect hack (not recommended)
        /*
        if (window.location.pathname !== '/') {
          window.location.href = '/#' + window.location.pathname;
        }*/
        var vm = this;
        console.log(window.location);

        vm.content = "Landing Data";

        vm.selectedDepartureICAO = "";
        vm.selectedArrivalICAO = "";
        vm.selectedWeight = "";

        //check selected Departure
        if (SelectedData.selectedDepartureICAO !== null) {
            vm.selectedDepartureICAO = SelectedData.selectedDepartureICAO;
        }

        //check selected Arrival
        if (SelectedData.selectedArrivalICAO !== null) {
            vm.selectedArrivalICAO = SelectedData.selectedArrivalICAO;
        }

        //check selected weight
        if (SelectedData.selectedWeight !== null) {
            vm.selectedWeight = SelectedData.selectedWeight;
        }

        //refactored for Angular 1.6 - removed success/error, used Promises...
        vm.getLandingDataForWeight = function() {
            
            AirplaneData.getClimbDataForWeight(vm.selectedWeight.weight)
                .then(function(response) {
                    //since find may select many, just return the single object
                    vm.takeoffData = response.data;
                    console.log(vm.takeoffData);
                })
                .catch(function(e) {
                    console.log(e);
                });            
        }

    }

})();
