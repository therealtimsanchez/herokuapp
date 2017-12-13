var mongoose = require('mongoose');

var ClimbSchema = new mongoose.Schema({
	weight: String,
	vfriFlap5: String,
	vfriFlap10: String,
	vfriFlap15: String,
	vClmb: String
});

mongoose.model('ClimbData', ClimbSchema, 'ClimbData');

var TakeoffSchema = new mongoose.Schema({
	weight: Number,
	flaps: Number,
	vr: Number,
	v2: Number,
	atOrBelow20: Boolean,
	above20: Boolean,
	altitude: Number,
});

mongoose.model('TakeoffData', TakeoffSchema, 'TakeoffData');

var LandingSchema = new mongoose.Schema({
	weight: Number,
	flaps: Number,
	vApp: Number,
	vRef: Number,
	vGa: Number,
});

mongoose.model('LandingData', LandingSchema, 'LandingData');