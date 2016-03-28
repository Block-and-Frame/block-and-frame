const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8',
  },
  // debug: true,
});
const bookshelf = require('bookshelf')(knex);
// const jsonColumns = require('bookshelf-json-columns');
// bookshelf.plugin(jsonColumns);
// As it creates a connection pool for the current database,
// you should use the bookshelf instance returned throughout your library:

// User schema
bookshelf.knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    bookshelf.knex.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('email', 100).unique();
      user.string('username', 100);
      user.string('password', 100);
      user.string('instagram_id', 100).unique();
      user.string('instagram_token', 200);
      user.string('instagram_username', 100).unique();
      user.string('instagram_profile_pic', 200);
      user.string('bio', 1000);
      user.string('location', 50);
      user.boolean('is_traveling');
      user.integer('avatar_id').references('images.id');
      user.timestamps();
    }).then(() => {
      console.log('Created users table');
    });
  }
});

// Event schema
bookshelf.knex.schema.hasTable('events').then((exists) => {
  if (!exists) {
    bookshelf.knex.schema.createTable('events', (event) => {
      event.increments('id').primary();
      event.string('name', 100);
      event.string('location', 100);
      event.date('date');
      event.time('time');
      event.string('coordinates', 100);
      event.string('description', 1000);
      event.json('toBring').nullable();
      event.timestamps();
    }).then(() => {
      console.log('Created events table');
    });
  }
});

// Event and Users join table
bookshelf.knex.schema.hasTable('events_users').then((exists) => {
  if (!exists) {
    bookshelf.knex.schema.createTable('events_users', (eventUser) => {
      eventUser.unique(['event_id', 'user_id']);
      eventUser.integer('event_id').references('events.id');
      eventUser.integer('user_id').references('users.id');
      eventUser.boolean('is_creator');
      eventUser.timestamps();
    }).then(() => {
      console.log('Created events_users table');
    });
  }
});

bookshelf.knex.schema.hasTable('images').then((exists) => {
  if (!exists) {
    bookshelf.knex.schema.createTable('images', (images) => {
      images.increments('id').primary();
      images.json('avatar_url');
    }).then(() => {
      console.log('Created images table');
    });
  }
});

// Contribution
// bookshelf.knex.schema.hasTable('contributions').then((exists) => {
//   if (!exists) {
//     bookshelf.knex.schema.createTable('contributions', (contribution) => {
//       contribution.increments('id').primary();
//       contribution.string('item', 100);
//       contribution.string('description', 500);
//       contribution.integer('event_id').references('events.id');
//       contribution.integer('contributor_id').references('users.id');
//       contribution.timestamps();
//     }).then(() => {
//       console.log('Created contributions table');
//     });
//   }
// });

module.exports = bookshelf;
