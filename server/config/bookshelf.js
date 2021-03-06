const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8',
  },
  // Uncomment below to show database queries in console
  // debug: true,
});
const bookshelf = require('bookshelf')(knex);

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
      event.string('hashtag', 100);
      event.string('date', 12);
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

// Image table
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

// Comments table
bookshelf.knex.schema.hasTable('comments').then((exists) => {
  if (!exists) {
    bookshelf.knex.schema.createTable('comments', (comments) => {
      comments.increments('id').primary();
      comments.string('text', 1000);
      comments.integer('event_id');
      comments.integer('user_id');
      comments.string('username');
      comments.date('created_at');
    }).then(() => {
      console.log('Created comments table');
    });
  }
});

module.exports = bookshelf;
