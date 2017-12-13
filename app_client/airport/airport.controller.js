(function() {

  angular
    .module('airplaneApp')
    .controller('airportCtrl', airportCtrl);

  airportCtrl.$inject = ['$scope', 'AirportData', 'AirplaneData', 'SelectedData'];

  function airportCtrl($scope, AirportData, AirplaneData, SelectedData) {
    // Nasty IE9 redirect hack (not recommended)
    /*
    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }*/
    console.log(window.location);    
    
    
    var vm = this;
    vm.content = "Information";
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

    //refactored for Angular 1.6 - removed success/error, used Promises...
    vm.getAirportData = function() {
      AirportData.getAirports()
        .then(function(response) {
          vm.airports = response.data;
          console.log(response);
        })
        .catch(function(e) {
          console.log(e);
        });
    }

    //refactored for Angular 1.6 - removed success/error, used Promises...
    vm.getClimbData = function() {
      AirplaneData.getClimbData()
        .then(function(response) {
          vm.climbData = response.data;
          console.log(vm.climbData);
        })
        .catch(function(e) {
          console.log(e);
        });
    }

    vm.toggleMenu = function() {
      if (vm.class === "toggled") {
        vm.class = "";
      }
      else {
        vm.class = "toggled";
      }
      console.log(vm.class + " is good");
    };
    
    vm.clearSelectedData = function(){
      
      vm.selectedArrivalICAO = null;
      vm.selectedDepartureICAO = null;
      vm.selectedWeight = null;
    }
    
    //saved departure
    $scope.$watch(
      function(){
        return vm.selectedDepartureICAO;    
      }, 
      function (newValue, oldValue) {
        console.log(oldValue);
        console.log(newValue);
        if (newValue.icao !== oldValue.icao){
          SelectedData.selectedDepartureICAO = newValue;
        } 
      }, 
      true
    );
    
    //saved arrival
    $scope.$watch(
      function(){
        return vm.selectedArrivalICAO;
      }, 
      function (newValue, oldValue) {
        console.log(oldValue);
        console.log(newValue);
        if (newValue.icao !== oldValue.icao){
          SelectedData.selectedArrivalICAO = newValue;
        } 
      }, 
      true
    );
    
    //saved weight
    $scope.$watch(
      function(){
        return vm.selectedWeight;
      }, 
      function (newValue, oldValue) {
        console.log(oldValue);
        console.log(newValue);
        if (newValue.weight !== oldValue.weight){
          SelectedData.selectedWeight = newValue;
        } 
      }, 
      true
    );    

    //call services
    vm.getAirportData();
    vm.getClimbData();

  }

})();
