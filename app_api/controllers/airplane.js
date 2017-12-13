var mongoose = require('mongoose');
var ClimbData = mongoose.model('ClimbData');
var TakeoffData = mongoose.model('TakeoffData');
var LandingData = mongoose.model('LandingData');


//utility method for the module
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

//// CLIMB DATA ////////////////////////////////////////////////////////////////
/* GET all ClimbData records */
module.exports.takeoffDataReadAll = function(req, res) {
    console.log("Finding all Takeoff Data Records", req);

    TakeoffData
        .find({})
        .exec(function(err, takeoffData) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
            }
            console.log(takeoffData);
            sendJSONresponse(res, 200, takeoffData);
        });
}

/* GET ClimbData by weight */
module.exports.takeoffDataReadOne = function(req, res) {
    console.log('Finding Takeoff Data Record', req.params);
    if (req.params && req.params.weight) {
        TakeoffData
            .find({
                weight: req.params.weight
            })
            .exec(function(err, takeoffData) {
                if (!takeoffData) {
                    sendJSONresponse(res, 404, {
                        "message": "weight value not found"
                    });
                    return;
                }
                else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(takeoffData);
                sendJSONresponse(res, 200, takeoffData);
            });
    }
    else {
        console.log('No weight value specified');
        sendJSONresponse(res, 404, {
            "message": "No weight value in request"
        });
    }
};

//// CLIMB DATA ////////////////////////////////////////////////////////////////
/* GET all ClimbData records */
module.exports.climbDataReadAll = function(req, res) {
    console.log("Finding all Climb Data Records", req);

    ClimbData
        .find({})
        .exec(function(err, climbData) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
            }
            console.log(climbData);
            sendJSONresponse(res, 200, climbData);
        });
}

/* GET ClimbData by weight */
module.exports.climbDataReadOne = function(req, res) {
    console.log('Finding Climb Data Record', req.params);
    if (req.params && req.params.weight) {
        ClimbData
            .find({
                weight: req.params.weight
            })
            .exec(function(err, climbData) {
                if (!climbData) {
                    sendJSONresponse(res, 404, {
                        "message": "weight value not found"
                    });
                    return;
                }
                else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(climbData);
                sendJSONresponse(res, 200, climbData);
            });
    }
    else {
        console.log('No weight value specified');
        sendJSONresponse(res, 404, {
            "message": "No weight value in request"
        });
    }
};

//// LANDING DATA //////////////////////////////////////////////////////////////
/* GET LandingData by weight */
module.exports.landingDataReadOne = function(req, res) {
    console.log('Finding Climb Data Record', req.params);
    if (req.params && req.params.weight && req.params.flaps) {
        

        //obtain the given weight value
        var givenWeight = req.params.weight;
        
        //weight selected from interpolation below
        var selectedWeight = 0;        

        //find the min weight in the data - returns a Promise
        var minWeight = LandingData.aggregate([ 
            {
                $group: 
                {
                    _id: null, 
                    minValue: { 
                        $min : "$weight" 
                        
                    }
                
                }
            }]
        ).exec();
        
        //find the max weight in the data - returns a Promise
        var maxWeight = LandingData.aggregate([ 
            {
                $group: 
                {
                    _id: null, 
                    maxValue: { 
                        $max : "$weight" 
                        
                    }
                
                }
            }]
        ).exec();

        //find the closest number below - returns a Promise
        var closestBelow = LandingData.find({
            'weight': {
                $lte: givenWeight
            }
        })
        .sort({
            'weight': -1
        })
        .limit(1)
        .exec();
        
        //find the closest number above - returns a Promise
        var closestAbove = LandingData.find({
            'weight': {
                $gte: givenWeight
            }
        })
        .sort({
            'weight': 1
        })
        .limit(1)
        .exec();         

        //using promises to chain these together - http://mongoosejs.com/docs/promises.html
        //and here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
        Promise.all([minWeight, maxWeight, closestBelow, closestAbove])
            //that is a lambda expression below - a shortcut for a function
            .then( results => {
                //console.log(results);
                
                var below = results[2][0].weight;
                console.log("below: " + below);
                
                var above = results[3][0].weight;
                console.log("above: " + above);
                
                //which is smaller?
                var sequence = [Math.abs(givenWeight - below), Math.abs(givenWeight - above)];
                
                console.log("difference between given weight and lower: " + sequence[0]);
                console.log("difference between given weight and hight: " + sequence[1]);
                
                //magic - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
                var lowval = Math.min.apply(Math, sequence);
                
                console.log("low value: " + lowval);                
                
                var key = sequence.indexOf(lowval);
                
                console.log("key: " + key);
                
                var selectedWeight = 0;
                
                switch(key){
                    case 0:
                        selectedWeight = below;
                        break;
                    case 1:
                        selectedWeight = above;
                        break;
                }
                
                console.log("Selected Weight: " + selectedWeight);
                
                LandingData
                    .find({
                        'flaps': req.params.flaps,
                        'weight': selectedWeight
                    })
                    .exec(function(err, landingData) {
                        if (!landingData) {
                            sendJSONresponse(res, 404, {
                                "message": "weight value not found"
                            });
                            return;
                        }
                        else if (err) {
                            console.log(err);
                            sendJSONresponse(res, 404, err);
                            return;
                        }
                        
                        console.log(landingData);
                        sendJSONresponse(res, 200, landingData);
                    });                
                
            }
        );
    }
    else {
        console.log('No weight value specified');
        sendJSONresponse(res, 404, {
            "message": "No weight value in request"
        });
    }
};

/* GET all ClimbData records */
module.exports.landingDataReadAll = function(req, res) {
    console.log("Finding all Landing Data Records", req);

    LandingData
        .find({})
        .exec(function(err, climbData) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
            }
            console.log(climbData);
            sendJSONresponse(res, 200, climbData);
        });
}