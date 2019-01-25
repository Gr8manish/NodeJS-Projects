const request = require('request');
const fs = require('fs');

var getWeather = (lat, lng, callback) => {
    var keys = fs.readFileSync("../keys.json",'utf8');
    keys = JSON.parse(keys);
    request({
        url:`https://api.forecast.io/forecast/${keys.forecastKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to Forecast.io server.');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: (body.currently.temperature - 32) * 5 / 9,
                apparentTemperature: (body.currently.apparentTemperature - 32) * 5 / 9
              });
        };
    });
};

module.exports = {
    getWeather
}