var express             = require('express');
var router              = express.Router();
var ctrlAirplaneData    = require('../controllers/airplane');
var ctrlAirportData     = require('../controllers/airport');
var ctrlDarkSkyApi     = require('../controllers/darkskyapi');

/* TAKEOFF DATA */
router.get('/takeoffdata/:flaps/:weight', ctrlAirplaneData.takeoffDataReadOne);
router.get('/takeoffdata', ctrlAirplaneData.takeoffDataReadAll);

/* CLIMB DATA */
router.get('/climbdata/:weight', ctrlAirplaneData.climbDataReadOne);
router.get('/climbdata', ctrlAirplaneData.climbDataReadAll);

/* LANDING DATA */
router.get('/landingdata/:flaps/:weight', ctrlAirplaneData.landingDataReadOne);
router.get('/landingdata', ctrlAirplaneData.landingDataReadAll);

/* AIRPORT DATA */
router.get('/airportdata', ctrlAirportData.airportDataReadAll);

/* API KEYS */
router.get('/darkskyapi/:lat/:lon', ctrlDarkSkyApi.getWeatherData);

module.exports = router;
