const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST_KEY}&query=${lat},${long}`;
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to forecast');
        } else if (body.error) {
            callback('Unable to find forecast');
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                uvindex: body.current.uv_index
            });
        }
    });
};
module.exports = forecast;