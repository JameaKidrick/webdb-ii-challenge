
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 'JTHFE2C24A2504933', make: 'Lexus', model: 'IS 350C', mileage: 44805, transmission_type: 'Automated-Manual Transmission', status: 'Good'},
        {vin: 'JH4KA2640HC004148', make: 'Acura', model: 'Legend', mileage: 71511, transmission_type: 'Automated-Manual Transmission', status: 'Great'},
        {vin: '1G8ZF52801Z328015', make: 'Saturn', model: 'S Series', mileage: 73075, transmission_type: 'Automated-Manual Transmission', status: 'Poor'}
      ]);
    });
};
