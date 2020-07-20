const express = require('express');

const app = express();
const port = process.env || 3000;

app.get('/', (req, res) => {
    res.send('wez');
})