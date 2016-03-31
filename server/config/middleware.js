const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const webpack = require('webpack');
const routes = require('../routes.js');
const authRoutes = require('../auth/authRoutes');
const publicPath = path.resolve(__dirname, '/dist');
const passportConfig = require('./passport');
const isDeveloping = process.env.NODE_ENV !== 'production';
const isTesting = process.env.NODE_ENV === 'test';
const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  quiet: true,
});

module.exports = (app, express) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  passportConfig(passport);
  app.use('/auth', authRoutes);

  // Check environment and use appropriate middleware
  if (isTesting) {
    app.use('/api', routes);
  } else {
    app.use(morgan('dev'));
    app.use('/api', passport.authenticate('jwt', { session: false }), routes);
  }
  if (isDeveloping) {
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware);
  } else {
    app.use('/dist', express.static(publicPath));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
};
