const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather!',
        message: 'Get your local weather',
        name: 'Fred'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'bob'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'run mate',
        name: 'Fred'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Address is mandatory'
        })
    }
    const place = req.query.address;
    geocode(place, (err, {lat, lon, location} = {}) => {
        if (err) {
            return res.send({ err });
        }
        forecast(lat, lon, (error, result) => {
            if (error) {
                return res.send({
                    error: error.message
                })
            }
            res.send({
                title: 'Weather',
                temp: result.temperature,
                forecast: result.description,
                location,
                feelslike: result.feelslike
            });
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help page not found',
        name: 'Fred'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Fred'
    });
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})