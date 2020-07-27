const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmdlcm5lciIsImEiOiJja2NzemcyYnMxczh1MnpvMm1icWZiOTF5In0.TxzKU6G6hZdqqjFon1m86A`;
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect');
        } else if (body.features.length === 0) {
            callback('Location not found');
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;