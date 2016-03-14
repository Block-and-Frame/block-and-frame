var express = require('express');
var userController = require('./userController');
var router = express.Router();

module.exports = function (app) {
  // app === userRouter injected from middlware.js
  app.get('/', userController.getAllUsers);
  app.get('/:userId', userController.getUserbyId);
  app.post('/', userController.createUser);
  app.put('/:userId', userController.editUser);
  app.delete('/:userId', userController.deleteUser);
};

