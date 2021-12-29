const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const ProofModel = require('./proof.model');
const ExamineeModel = require('./examinee.model');
const UserModel = require('./user.model');
const BubbleModel = require('./bubble.model');

const { logger } = require('../helpers/logger');

const moduleLogger = logger.child({ module: 'db' });

if (moduleLogger.debug()) {
  moduleLogger.debug('DBCONFIG', dbConfig);
} else {
  const data = {
    name: dbConfig.DB,
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    logging: dbConfig.LOGGING
  };
  moduleLogger.info('DBCONFIG', data);
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const Proof = ProofModel(sequelize, Sequelize);
const Examinee = ExamineeModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Bubble = BubbleModel(sequelize, Sequelize);

Bubble.hasMany(User, { as: 'user' });

Bubble.hasMany(Examinee, { as: 'examinee' });

Proof.belongsTo(User, {
  foreignKey: 'checked_from',
  as: 'user'
});

Examinee.belongsTo(User, {
  foreignKey: 'checked_from',
  as: 'user'
});

//
// User.belongsTo(Examinee, {
//  foreignKey: "examineeId",
//  as: "examinee",
// });

module.exports = {
  sequelize,
  Sequelize,
  Proof,
  Examinee,
  User,
  Bubble
};
