const User = require('./userModel').User;
const Image = require('./userModel').Image;
const Mailgun = require('mailgun').Mailgun;
const mg = new Mailgun(process.env.MAILGUN_KEY);

module.exports = {
  getAllUsers(req, res) {
    User.fetchAll({
      // NOTE password is being sent to front-end
      withRelated: ['events'],
      columns: ['id', 'email', 'username', 'password', 'bio', 'location', 'is_traveling'],
    })
    .then((users) => {
      res.status(200).send(users.models);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  },

  getUserbyId(req, res) {
    User.where({ id: req.params.userId })
    .fetch({
      withRelated: ['events'],
      columns: [
        'id', 'email', 'username', 'bio', 'location', 'is_traveling', 'avatar_id', 'instagram_id', 'instagram_token', 'instagram_username', 'instagram_profile_pic',
      ],
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
          res.status(200).send(createdUser);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
      }
    });
  },

  editUser(req, res) {
    const userId = req.user.get('id');
    User.where({ id: userId })
    .fetch()
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        return user.save({
          email: req.body.email,
          username: req.body.username,
          bio: req.body.bio,
          location: req.body.location,
          is_traveling: req.body.is_traveling,
          instagram_username: req.body.instagram_username,
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
    const userId = req.user.get('id');
    User.where({ id: userId })
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

  saveAvatarURL(req, res) {
    const filepath = req.body.filepath;
    const userId = req.body.userId;

    new Image({
      avatar_url: { filepath },
    })
    .save()
    .then((image) => {
      User.where({ id: userId })
      .fetch()
      .then((user) => {
        if (!user) {
          res.status(404).send('User not found');
        } else {
          user.save({
            avatar_id: image.attributes.id,
          });
          res.status(200).json('Avatar saved.');
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
  },

  getAvatarURL(req, res) {
    User.where({ id: req.params.userId })
    .fetch()
    .then((user) => {
      Image.where({ id: user.attributes.avatar_id })
      .fetch()
      .then((image) => {
        res.json(image.attributes.avatar_url);
      });
    })
    .catch((err) => {
      res.send(`User not found - ${err}`);
    });
  },

  emailHost(userInfo, req, res) {
    User.where({ id: userInfo.userId })
    .fetch({
      withRelated: ['events'],
      columns: [
        'id', 'email', 'username', 'bio', 'location', 'is_traveling', 'instagram_id', 'instagram_token', 'instagram_username', 'instagram_profile_pic',
      ],
    })
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        const userEmail = user.attributes.email;
        const hostEmail = userInfo.host.email;
        mg.sendText('bmoorebrian53@gmail.com', hostEmail, 'Someone joined your spread!', `Hi, ${userEmail} joined your spread`,
          err => {
            if (err) {
              console.log('ERROR SENDING EMAIL', err);
            } else {
              console.log('SUCCESS SENDING EMAIL');
            }
          });
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },
};
// to test edit
// curl -H "Content-Type: application/json" -X PUT -d '{"password":"abddf"}' http://localhost:8080/api/users/2

// to add a user
// curl -H "Content-Type: application/json" -X POST -d '{"username":"User","password":"xyz","email":"example@example.com"}' http://localhost:8080/api/users
