const faunadb = require('faunadb');
const uuid = require('uuid');

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

const {
  Ref,
  Paginate,
  Get,
  Match,
  Select,
  Index,
  Create,
  Collection,
  Join,
  Call,
  Function: Fn,
  Delete,
} = faunadb.query;

const getSecretAccessToken = () => {
  return `${process.env.ACCESS_TOKEN_SECRET}`;
};

const getSecretRefreshToken = () => {
  return `${process.env.REFRESH_TOKEN_SECRET}`;
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const getUserByUsername = (username) => {
  return Call(Fn('getUser'), username);
};

module.exports = {
  getSecretAccessToken,
  getSecretRefreshToken,
  fileFilter,
  getUserByUsername,
};
