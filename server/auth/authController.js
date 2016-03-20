const User = require('../users/userModel');
const jwt = require('jsonwebtoken');

// Work around for Travis CI
// TODO use ENV variables
let secret;
try {
  secret = require('./config').secret;
} catch (e) {
  secret = 'localtesting';
}

module.exports = {
  signin(req, res) {
    User.where({ email: req.body.email })
      .fetch().then((user) => {
        if (!user) {
          res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
          // Check if password matches
          const isMatch = user.comparePassword(req.body.password, user.get('password'));
          if (isMatch) {
            // Create token if the password matched and no error was thrown
            const token = jwt.sign(user, secret, {
              expiresIn: 10080,
            });
            console.log('user', user);
            res.json({ success: true, token: `JWT ${token}`, id: user.get('id') });
          } else {
            res.send({ success: false, message: 'Error. Invalid password.' });
          }
        }
      });
  },

  signup(req, res) {
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
};
