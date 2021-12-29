require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bunyanMiddleware = require('bunyan-middleware');
const { writeFileSync } = require('fs');
const sequelizeErd = require('sequelize-erd');
const { logger } = require('./helpers/logger');

const moduleLogger = logger.child({ module: 'server' });

const app = express();

const port = process.env.GCHECK_API_PORT || 3000;

app.set('trust proxy', true);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(
  bunyanMiddleware({
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'reqId',
    obscureHeaders: ['authorization'],
    logger,
    additionalRequestFinishData: (_req, _res) => ({})
  })
);

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

const db = require('./models');

db.sequelize
  .sync({ alter: true })
  .then(data => {
    moduleLogger.info('Database is reachable', data);
  })
  .catch(err => {
    moduleLogger.error('Error syncing sequelize', err);
  });
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
// });

require('./routes/bubble.routes')(app);
require('./routes/user.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/examinee.routes')(app);

// TODO:  only in dev env
sequelizeErd({ source: db.sequelize }).then(res => {
  writeFileSync('./erd.svg', res);
}); // sequelizeErd() returns a Promise

app.get('/', (_req, res) => {
  res.send({ success: true, status: 200, message: 'API is up and running.', data: {} }, 200);
});

// catch 404 and forward to error handler
app.get('/*', (_req, res) => {
  res.send({ success: false, status: 404, message: 'Page not found.', data: {} }, 404);
});
const server = app.listen(port);

moduleLogger.info(`API server started on: ${port}`);

module.exports = { app, server };
