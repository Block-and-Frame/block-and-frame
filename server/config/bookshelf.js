// For Travis CI 
//TODO use ENV variables
let config;
try {
  config = require('./config.js');
} catch (e) {
  config = {
    host: '127.0.0.1',
    user: '',
    pw: '',
    db: 'block-and-frame-test',
 };
}

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.host,
    user: config.user,
    password: config.pw,
    database: config.db,
    charset: 'utf8',
 },
   // debug: true,
 });
// As it creates a connection pool for the current database,
// you should use the bookshelf instance returned throughout your library:
const bookshelf = require('bookshelf')(knex);
const jsonColumns = require('bookshelf-json-columns');

bookshelf.plugin(jsonColumns);
// User schema
bookshelf.knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    bookshelf.knex.schema.createTable('users', user => {
      user.increments('id').primary();
      user.string('email', 100).unique();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.string('bio', 1000);
      user.string('city', 20);
      user.string('country', 20);
      user.timestamps();
    }).then(() => {
      console.log('Created users table');
    });
  }
});

// Event schema
bookshelf.knex.schema.hasTable('events').then(exists => {
  if (!exists) {
    bookshelf.knex.schema.createTable('events', event => {
      event.increments('id').primary();
      event.string('name', 100);
      event.string('location', 100);
      event.string('coordinates', 100);
      event.string('description', 1000);
      event.timestamps();
    }).then(() => {
      console.log('Created events table');
    });
  }
});

// Event and Users join table
bookshelf.knex.schema.hasTable('events_users').then(exists => {
  if (!exists) {
    bookshelf.knex.schema.createTable('events_users', eventUser => {
      eventUser.increments('id').primary();
      // onDelete('CASCADE') deletes foreign keys of deleted models
      eventUser.integer('event_id').references('events.id').onDelete('CASCADE');
      eventUser.integer('user_id').references('users.id').onDelete('CASCADE');
      eventUser.boolean('is_creator');
      eventUser.timestamps();
    }).then(() => {
      console.log('Created events_users table');
    });
  }
});

// //Contribution
// bookshelf.knex.schema.hasTable('contributions').then(function (exists) {
//   if (!exists) {
//     bookshelf.knex.schema.createTable('contributions', function (contrib) {
//       contrib.increments('id').primary();
//       contrib.string('name', 100);
//       contrib.integer('event_id').references('events.id');
//       contrib.integer('user_id').references('users.id');
//       contrib.timestamps();
//     }).then(function (table) {
//       console.log('Created contributions table');
//     });
//   }
// });

module.exports = bookshelf;
