
exports.up = function(knex) {
  return knex.schema.createTable('cars', function(table){
    table.increments(); //id

    table.string('vin', 255).notNullable();
    table.string('make', 255).notNullable();
    table.string('model', 255).notNullable();
    table.integer('mileage').notNullable();
    table.string('transmission_type', 255);
    table.string('status', 255);

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
