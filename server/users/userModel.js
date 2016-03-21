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
  hashPassword(model) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(model.attributes.password, 10, (err, hash) => {
        if (err) reject(err);
        model.set('password', hash);
        resolve(hash);
      });
    });
  },
  comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
});

module.exports = User;
