(function() {

    angular
        .module('airplaneApp')
        .controller('takeoffCtrl', takeoffCtrl);

    takeoffCtrl.$inject = ['$scope', 'SelectedData'];

    function takeoffCtrl($scope, SelectedData) {
        // Nasty IE9 redirect hack (not recommended)
        /*
        if (window.location.pathname !== '/') {
          window.location.href = '/#' + window.location.pathname;
        }*/
        var vm = this;
        console.log(window.location);

        vm.content = "Takeoff Data";

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
    }

})();
