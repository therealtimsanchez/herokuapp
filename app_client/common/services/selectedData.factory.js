(function() {

  angular
    .module('airplaneApp')
    .factory('SelectedData', selectedData);

  //selectedData.$inject = ['$http'];
  function selectedData () {
      return {
          selectedDepartureICAO : '',
          selectedArrivalICAO : '',
          selectedWeight : ''
      };
  }

})();