const axios = require('axios');

module.exports = {
  getUserPics(req, res) {
    console.log('in testinsa!!', req.body);
    axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${req.body.accessToken}`)
    .then((data) => {
      console.log('DATA', data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error('myErr', err);
      res.sendStatus(500);
    });
  },
};

