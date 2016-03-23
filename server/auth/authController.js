const User = require('../users/userModel');
const jwt = require('jsonwebtoken');

// TODO use enviroment variables
// This is a work-around for Travis CI
var secret; // let doesnt work
try {
  secret = require('./config.js').secret;
} catch (err) {
  console.log(err);
  secret = 'localtestingsecret!';
}

module.exports = {
  signin(req, res) {
    const password = req.body.password;
    const email = req.body.email;

    User.where({ email })
    .fetch()
    .then((user) => {
      if (!user) {
        return res.status(500).end('Incorrect username or password.');
      }

      return user.comparePassword(password, user.get('password'))
      .then((isMatch) => {
        if (!isMatch) {
          return res.status(500).end('Incorrect username or password.');
        }
        const token = jwt.sign(user, secret, { expiresIn: 10080 });
        return res.json({ success: true, token: `JWT ${token}`, id: user.get('id') });
      })
      .catch((err) => {
        return res.status(500).end(err);
      });
    });
  },

  signup(req, res) {
    const password = req.body.password;
    const email = req.body.email;

    new User({ email })
    .fetch()
    .then((user) => {
      if (user) {
        console.log('here');
        res.status(500).send('Error. User already exists.');
      }
      if (!user) {
        const newUser = new User({
          password,
          email,
        });
        newUser.save()
        .then((createdUser) => {
          const token = jwt.sign(user, secret, {
            expiresIn: 10080,
          });
          res.json({ success: true, token: `JWT ${token}`, id: createdUser.get('id') });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
      }
    });
  },
};
