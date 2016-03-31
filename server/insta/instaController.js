const axios = require('axios');
const User = require('../users/userModel').User;

module.exports = {
  getUserPics(req, res) {
    axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${req.body.accessToken}`)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  },

  getUniqueTagPics(req, res) {
    const hashtag = req.body.hashtag;
    User.where({ id: req.body.userId })
    .fetch()
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        const accessToken = user.get('instagram_token');
        if (accessToken) {
          axios.get(`https://api.instagram.com/v1/tags/${hashtag}/media/recent?access_token=${accessToken}`)
          .then((data) => {
            res.status(201).send(data);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          }); 
        } else {
          res.status(404).send('User does not have Instagram access token');
        }
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },
};
