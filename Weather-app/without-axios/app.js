const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather');

const argv = yargs
            .options({
                a: {
                    demand: true,
                    alias: 'address',
                    describe: 'Address to fetch weather for',
                    string: true
                }
            })
            .help()
            .alias('help','h')
            .argv;

geocode.geocodeAddress(argv.a, (errorMessage, result) => {
    if(errorMessage){
        console.log("hre"+errorMessage);
    }else {
        console.log(result.address);
        weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResults) => {
            if (errorMessage){
                console.log(errorMessage);
            }else {
                console.log(`It's currently ${weatherResults.temperature} degree. It feels like ${weatherResults.apparentTemperature} degree.`);
            }
        });
    }
})