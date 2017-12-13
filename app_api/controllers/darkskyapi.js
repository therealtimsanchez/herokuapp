var request = require('request');

//utility method for the module
var sendJSONresponse = function(res, status, content)
{
    res.status(status);
    res.json(JSON.parse(content));
    //res.json(content);
}

/* GET all API Key Values Values */
module.exports.getWeatherData = function(req, res)
{
    console.log("Retrieving Key Store Values");
    
    var lat = req.params.lat;
    var lon = req.params.lon;
  
    var darkyskyurl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_KEY + 
             '/' + lat + ',' + lon;
    
    request(darkyskyurl, function(error, response, body){
        //console.log(body);
        sendJSONresponse(res, "200", body); 
    });

}