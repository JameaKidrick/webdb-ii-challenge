const express = require('express');

const knex = require('./data/dbConfig');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex</h3>');
});

/*********************************************** MIDDLEWARE ***********************************************/
// CAR ID DOESN'T EXIST
function validateCarID(req, res, next){
  knex
    .select('*')
    .from('cars')
    .where('id', '=', req.params.id)
    .first()
    .then(car => {
      if(!car){
        res.status(404).json({ error: 'Car ID not in database' })
      }else{
        res.locals.car = car
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
}

// MISSING INPUT DATA (VIN, MAKE, MODEL, MILEAGE)
function validateCarInfo(req, res, next){
  const { vin, make, model, mileage } = req.body;
  if(!vin || !make || !model || !mileage){
    res.status(400).json({ error: "Missing Car Data" })
  }else{
    res.locals.info = req.body;
    next();
  }
}
/*********************************************** REQUEST HANDLERS ***********************************************/
// GET ALL CARS
server.get('/api/cars', (req, res) => {
  knex
    .select('*')
    .from('cars')
    .then(cars => {
      res.status(200).json(cars)
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

// GET SPECIFIED CAR (ID)
server.get('/api/cars/:id', validateCarID, (req, res) => {
  res.status(200).json(res.locals.car)
})

// ADD A NEW CAR (VIN, MAKE, MODEL, MILEAGE)
server.post('/api/cars/', validateCarInfo, (req, res) => {
  knex
    .insert(req.body, 'id')
    .into('cars')
    .then(car => {
      res.status(200).json(car)
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

// UPDATE CAR (ID, VIN, MAKE, MODEL, MILEAGE) STRETCH
server.put('/api/cars/:id', [validateCarInfo, validateCarID], (req, res) => {
  knex('cars')
    .where(res.locals.car)
    .update(res.locals.info)
    .then(numberUpdated => {
      res.status(200).json(numberUpdated)
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

// DELETE CAR (ID) STRETCH
server.delete('/api/cars/:id', [validateCarID], (req, res) => {
  knex('cars')
    .where(res.locals.car)
    .del()
    .then(numberDeleted => {
      res.status(200).json(numberDeleted)
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})



module.exports = server