const errorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message =
    error.message || "It's not you. It's us. We are having some problems.";

  res.status(status).send(message);
};

module.exports = {
  errorHandler,
};
