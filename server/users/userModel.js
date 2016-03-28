const bookshelf = require('../config/bookshelf');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize() {
    this.on('creating', this.hashPassword, this);
  },
 
  events() {
    const Event = require('../events/eventModel');
    return this.belongsToMany(Event).withPivot(['is_creator']);
  },
  
  image() {
    return this.hasOne(Image);
  },

  hashPassword(model) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(model.get('password'), null, null, (err, hash) => {
        if (err) {
          console.log('Error here in hashPassword');
          reject(err);
        }
        console.log('PASSWORD', model.get('password'));
        model.set('password', hash);
        resolve(hash);
      });
    });
  },
  comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) reject(err);
        resolve(isMatch);
      });
    });
  },
});

const Image = bookshelf.Model.extend({
  tableName: 'images',
  users() {
    return this.belongsTo(User);
  },
});

module.exports = { User, Image };
