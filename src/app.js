const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather¡',
        name: 'Fred'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'run mate'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        temp: 40,
        place: 'here'
    });
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})