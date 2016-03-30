const app = require('./server/server');

app.listen(app.get('port'), () => {
  console.log('Listening on port:', app.get('port'));
});

module.exports = app;
