const faunadb = require("faunadb");

const faunadbClient = new faunadb.Client({
  secret: "fnAEF4byo_ACBacy1CtCUFuk_JZxjCMYvrbyv5q6",
});

const config = {
  accessTokenSecret: "accessTokenSecret",
  dateFormat: "yyyy-MM-dd",
  dbDateFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  faunadbClient,
};

module.exports = config;
