import { Database } from './database';
/**
 * Module dependencies.
 */
import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as errorHandler from 'errorhandler';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as bluebird from 'bluebird';
import { Sequelize } from 'sequelize-typescript';
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.snake' });
}

/**
 * Controllers (route handlers).
 */
import { HomeController } from './controllers/home';
import * as scoreController from './controllers/scores';
import Score from './model/score';

/**
 * Create Express server.
 */
const app = express();

const database = new Database();
database.init();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
}));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
/**
 * Primary app routes.
 */
const homeController = new HomeController();
app.get('/', homeController.index);
app.get('/scores', scoreController.all);
app.post('/scores', scoreController.add);

app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
