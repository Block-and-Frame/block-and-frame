var morgan = require('morgan');
var bodyParser = require('body-parser');


module.exports = function (app, express) {
  var userRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../app'));


  app.use('/api/users', userRouter); // use user router for all user requests

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
};
