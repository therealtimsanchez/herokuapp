(function() {

  angular
    .module('airplaneApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', `SelectedData`];

  function homeCtrl($scope, SelectedData) {
    // Nasty IE9 redirect hack (not recommended)
    /*
    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }*/
    var vm = this;
    console.log(window.location);
    
    vm.content = "Airplane Data";
    
    vm.selectedDepartureICAO = "";
    vm.selectedArrivalICAO = "";
    vm.selectedWeight = "";
    
    //check selected Departure
    if(SelectedData.selectedDepartureICAO !== null){
      vm.selectedDepartureICAO = SelectedData.selectedDepartureICAO;
    }
    
    //check selected Arrival
    if(SelectedData.selectedArrivalICAO !== null){
      vm.selectedArrivalICAO = SelectedData.selectedArrivalICAO;
    }
    
    //check selected weight
    if(SelectedData.selectedWeight !== null){
      vm.selectedWeight = SelectedData.selectedWeight;
    }      
  }

})();
