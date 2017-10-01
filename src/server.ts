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
const Sequelize = require('sequelize');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
import * as homeController from './controllers/home';

/**
 * Create Express server.
 */
const app = express();


// Or you can simply use a connection uri
const sequelize = new Sequelize('postgres://postgres:pw@localhost:5432/snake');
// sequelize
//   .authenticate()
//   .then(() => { console.log('Connection has been established successfully.'); })
//   .catch((err: any) => { console.error('Unable to connect to the database:', err); });

const Score = sequelize.define('scores', {
  name:  { type: Sequelize.STRING },
  score: { type: Sequelize.INTEGER }
});
// Score.findAll().then(
//   (s: any) => {
//     console.log(s);
//   }, (err: any) => console.error(err))
//   .catch((err: any) => console.error(err));
Score.sync({fore: true}).then(() => Score.create({name: 'max', score: 120}));

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
/**
 * Primary app routes.
 */
app.get('/', homeController.index);

app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
