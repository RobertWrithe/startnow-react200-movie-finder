require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const app = express();
const axios = require('axios');

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/results/:search', (req, res) => {
    axios.get(`http://www.omdbapi.com/?s=${req.params.search}${process.env.OMDB_API_KEY}`)
    .then(response => {
        res.send(response.data)
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(404).send(err.message)
    })
});

app.get('/details/:search', (req, res) => {
    axios.get(`http://www.omdbapi.com/?i=${req.params.search}${process.env.OMDB_API_KEY}`)
    .then(response => {
        res.send(response.data)
    })
    .catch((err) => {
        console.log('Error: ', err.message);
        res.status(404).send(err.message)
    })
});

module.exports = app;
