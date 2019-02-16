
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('houses', (table) => {
        table.increments('house_id').primary();
        table.string('name');
      }),
      knex.schema.createTable('photos', (table) => {
        table.increments('photo_id').primary();
        table.string('img_url'); 
        table.integer('img_order');
        table.integer('house_id');
        table.foreign('house_id').references('house_id').inTable('houses');
      })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('photos'),
        knex.schema.dropTable('houses')
    ]);
};
