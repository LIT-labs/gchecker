const bcrypt = require('bcryptjs');
const uuid = require('uuid'); // ES5
const moment = require('moment');
const mail = require('../helpers/mail');

const { tokenGenerator } = require('../helpers/auth.helper');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_reset_token: {
      type: DataTypes.UUID,
      allowNull: true
    },
    password_reset_expire_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    auth_token_expire_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.sendVerificationEmail = async function sendVerificationEmail() {
    this.set({
      password_reset_token: uuid.v4(),
      password_reset_expire_at: moment()
        .add(process.env.GCHECK_VALID_REGISTRATION_LINK_IN_DAYS, 'day')
        .format(process.env.GCHECK_TIME_FORMAT)
    });
    await this.save();
    await mail.sendVerificationEmail(this.email, this.name, this.password_reset_token);
  };

  User.prototype.updatePassword = function updatePassword(password) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.GHCECK_BCRYPT_SALTING_ROUND, 10), 'a');
    this.set({
      password: bcrypt.hashSync(password, salt),
      password_reset_token: ''
    });
    this.save();
  };

  User.prototype.generateToken = function generateToken() {
    this.set({
      auth_token_expires_at: moment()
        .add(process.env.GCHECK_JWT_EXPIRES_IN_HOURS, 'hours')
        .format(process.env.GCHECK_TIME_FORMAT)
    });
    this.save();
  };
  User.prototype.login = function login(bubbleName, bubbleSlug, bubbleId) {
    this.generateToken();

    return {
      userId: this.id,
      userName: this.name,
      authToken: tokenGenerator({
        userId: this.id,
        userName: this.name,
        slug: bubbleSlug,
        bubbleName,
        bubbleId
      }),
      bubbleName,
      bubbleId,
      slug: bubbleSlug
    };
  };
  return User;
};
