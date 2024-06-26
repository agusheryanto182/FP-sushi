const jwt = require('jsonwebtoken');
const {
  jwtSecret,
  jwtExpiration,
  jwtRefreshTokenSecret,
  jwtRefreshTokenExpiration,
} = require('../config');

const customError = require('../errors');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};
const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn: jwtRefreshTokenExpiration,
  });
  return token;
};

const isTokenValid = ({ token }) => {
  try {
    const result = jwt.verify(token, jwtSecret);
    if (!result) {
      throw new customError.UnauthenticatedError('failed to verify token');
    }
    return result;
  } catch (err) {
    if (err instanceof customError.UnauthenticatedError) {
      throw err;
    }
    throw new customError.UnauthenticatedError('failed to verify token : ' + err);
  }
};
const isTokenValidRefreshToken = ({ token }) =>
  jwt.verify(token, jwtRefreshTokenSecret);

module.exports = {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isTokenValidRefreshToken,
};
