var mongoose = require('mongoose');

var RunwaySchema = new mongoose.Schema({
    icao: String,
    runwayId: String,
    runwayLength: Number,
    runwayHeadingMagnetic: Number,
    runwayHeadingTrue: Number
})

var AirportSchema = new mongoose.Schema({
	iata: String,
	icao: String,
	airportName: String,
	airportCity: String,
	airportLat: Number,
	airportLon: Number,
	airportElevation: Number,
	runways: [RunwaySchema]
});

mongoose.model('AirportData', AirportSchema, 'AirportData');