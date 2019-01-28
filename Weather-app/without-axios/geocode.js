const request = require('request');
const fs = require('fs');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    var keys = fs.readFileSync("../keys.json",'utf8');
    keys = JSON.parse(keys);
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${keys.googleMapsKey}`,
        json: true   
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to google servers');
        }else if(body.status == 'ZERO_RESULTS') {
            callback('Unable to find the address.')
        }else if(body.status == 'OK') {
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        };
    });
};

module.exports = {
    geocodeAddress
}