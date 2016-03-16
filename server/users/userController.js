var _ = require('lodash');
var User = require('./userModel');
var Users = require('./userCollection');


module.exports = { 
  getAllUsers: function (req, res) {
    User.fetchAll()
    .then(function (users) {
      res.status(200).send(users.models);
    })
    .catch(function (err) {
      console.error(err);
      res.sendStatus(500);
    });
  },
  getUserbyId: function (req, res) {
    // Forge: Simple helper function for retrieving all instances of the given model.
    User.where({ id: req.params.userId })
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).send('User not found');
      }
      else {
        res.status(200).send(user);
      }
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
  },
  createUser: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var bio = req.body.bio;
    var city = req.body.city;
    var country = req.body.country;

    new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password,
          email: email,
          bio: bio,
          city: city,
          country: country,
        });
        newUser.save()
        .then(function(newUser) {
          res.status(201).send(newUser);
        })
        .catch(function (err) {
          res.status(500).send(err);
        });
      } 
    });
  },
  editUser: function (req, res) {
    User.where({ id: req.params.userId })
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).send('User not found');
      }
      else {
        user.save(req.body);
      }
    })
    .then(function(user) {
      res.status(200).send(user);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
  },
  deleteUser: function (req, res) {
    User.where({ id: req.params.userId })
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        user.destroy()
        .then(function () {
          res.status(200).send('User deleted');
        });
      }
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
  },
};
// to test edit
// curl -H "Content-Type: application/json" -X PUT -d '{"password":"abddf"}' http://localhost:8080/api/users/2

// to add a user
// curl -H "Content-Type: application/json" -X POST -d '{"username":"User","password":"xyz","email":"example@example.com"}' http://localhost:8080/api/users
