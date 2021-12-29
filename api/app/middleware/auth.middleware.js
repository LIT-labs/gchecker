// middleware/users.js
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { logger } = require('../helpers/logger');

const moduleLogger = logger.child({ module: 'authMiddleware' });
const secretKey = process.env.GCHECK_JWT_SECRET_KEY;

const db = require('../models');

const { User } = db;

const verifyToken = async jwtToken => {
  try {
    return await jwt.verify(jwtToken, secretKey, { algorithm: 'HS256' });
  } catch (e) {
    moduleLogger.error({ e });
    return null;
  }
};

const getTokenData = async req => verifyToken(req.headers.authorization);

const isAuthenticated = async (req, res, next) => {
  if (typeof req.headers['x-access-token'] !== 'undefined') {
    // retrieve the authorization header and parse out the
    // JWT using the split function
    const token = req.headers['x-access-token'];

    // Here we validate that the JSON Web Token is valid and has been
    // created using the same private pass phrase

    const data = await verifyToken(token);
    if (data === null) {
      moduleLogger.info('Verification failed. Return error.');
      return res.status(403).json({
        success: false,
        status: 401,
        message: 'Please login before to continue.',
        data: {}
      });
    }

    // get user to verify
    const user = await User.findByPk(data.userId);

    if (_.isEmpty(user)) {
      moduleLogger.info('User not found. Return error.');
      return res.status(403).json({
        success: false,
        status: 401,
        message: 'Please login before to continue.',
        data: {}
      });
    }

    // data is available, it means verification succeed.
    moduleLogger.debug('Verification succeed. Proceed to next.', data);
    req.body.bubbleName = data.bubbleName;
    req.body.slug = data.slug;
    req.body.bubbleId = data.bubbleId;
    return next();
  }

  // No authorization header exists on the incoming
  // request, return not authorized and throw a new error
  moduleLogger.info('No authorisation header. Return error.');
  return res.status(403).json({
    success: false,
    status: 403,
    message: 'Please login before to continue.',
    data: {}
  });
};

module.exports = { isAuthenticated, verifyToken, getTokenData };
