const express = require('express');

const knex = require('./data/dbConfig');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex</h3>');
});

// GET ALL CARS
server.get('/api/cars', (req, res) => {
  knex
    .select('*')
    .from('cars')
    .then(cars => {
      
    })
})

// GET SPECIFIED CAR (ID)


// ADD A NEW CAR (VIN, MAKE, MODEL, MILEAGE)


// UPDATE CAR (ID, VIN, MAKE, MODEL, MILEAGE) STRETCH


// DELETE CAR (ID) STRETCH




module.exports = server