const User = require('./userModel');

module.exports = {
  getAllUsers(req, res) {
    User.fetchAll({
      // NOTE password is being sent to front-end
      withRelated: ['events'],
      columns: ['id', 'email', 'username', 'password', 'bio', 'location', 'is_traveling'],
    })
    .then((users) => {
      console.log(users.models[0].relations.events);
      res.status(200).send(users.models);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  },
  getUserbyId(req, res) {
    // Forge: Simple helper function for retrieving all instances of the given model.
    User.where({ id: req.params.userId })
    .fetch({
      withRelated: ['events'],
      columns: ['id', 'email', 'username', 'bio', 'location', 'is_traveling'],
    })
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  createUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const bio = req.body.bio;
    const city = req.body.city;
    const country = req.body.country;

    if (!email || !password) {
      res.json({ success: false, message: 'Please enter email and password.' });
    }

    new User({ username })
    .fetch()
    .then((user) => {
      if (!user) {
        const newUser = new User({
          username,
          password,
          email,
          bio,
          city,
          country,
        });

        newUser.save()
        .then((createdUser) => {
          // TODO: omit password
          res.status(201).send(createdUser);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
      }
    });
  },

  editUser(req, res) {
    User.where({ id: req.params.userId })
    .fetch()
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        user.save({
          email: req.body.email,
          username: req.body.username,
          bio: req.body.bio,
          location: req.body.location,
          is_traveling: req.body.is_traveling,
        });
      }
    })
    .then((user) => {
      // TODO: why is this undefined?
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  deleteUser(req, res) {
    User.where({ id: req.params.userId })
    .fetch()
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        user.destroy()
        .then(() => {
          res.status(200).send('User deleted');
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  saveAvatar(req, res) {
    const id = req.body.id;
    const avatarUrl = req.body.url;
    console.log('id: ', id, 'url: ', avatarUrl);
    // save avatarUrl to the user
  },
};
// to test edit
// curl -H "Content-Type: application/json" -X PUT -d '{"password":"abddf"}' http://localhost:8080/api/users/2

// to add a user
// curl -H "Content-Type: application/json" -X POST -d '{"username":"User","password":"xyz","email":"example@example.com"}' http://localhost:8080/api/users
