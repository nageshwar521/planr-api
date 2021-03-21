const getSecretAccessToken = () => {
  return process.env.ACCESS_TOKEN_SECRET ?? '';
};

const getSecretRefreshToken = () => {
  return process.env.REFRESH_TOKEN_SECRET ?? '';
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export { getSecretAccessToken, getSecretRefreshToken, fileFilter };
