(function() {

    angular
        .module('airplaneApp')
        .controller('climbCtrl', climbCtrl);

    climbCtrl.$inject = ['$scope', 'AirplaneData', 'SelectedData'];

    function climbCtrl($scope, AirplaneData, SelectedData) {
        // Nasty IE9 redirect hack (not recommended)
        /*
        if (window.location.pathname !== '/') {
          window.location.href = '/#' + window.location.pathname;
        }*/
        var vm = this;
        console.log(window.location);

        vm.content = "Tasks for:";

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
        vm.getClimbDataForWeight = function() {
            
            AirplaneData.getClimbDataForWeight(vm.selectedWeight.weight)
                .then(function(response) {
                    //since find may select many, just return the single object
                    vm.climbData = response.data[0];
                    console.log(vm.climbData);
                })
                .catch(function(e) {
                    console.log(e);
                });            
        }

        
        
        //call services
        vm.getClimbDataForWeight();
    }

})();


