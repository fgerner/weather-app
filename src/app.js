const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('wez');
});
app.get('/weather', (req, res) => {
    res.send('weather page');
});
app.get('/about', (req, res) => {
    res.send('about page');
});
app.get('/help', (req, res) => {
    res.send('Help page');
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})