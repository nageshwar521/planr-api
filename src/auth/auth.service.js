const faunadb = require("faunadb");
const uuid = require("uuid");
const format = require("date-fns/format");
const { dbDateFormat } = require("../config");

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
  Lambda,
  Var,
  Map,
  Documents,
  Update,
} = faunadb.query;

const registerUser = async (user = {}) => {
  const id = uuid.v4();

  const newUser = {
    ...user,
    isActive: false,
    dateCreated: format(new Date(), dbDateFormat),
    dateModified: format(new Date(), dbDateFormat),
    id,
  };
  return faunadbClient.query(Create(Collection("users"), { data: newUser }));
};

module.exports = {
  registerUser,
};
