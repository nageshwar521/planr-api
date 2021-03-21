const getSecretAccessToken = (): string => {
  return process.env.ACCESS_TOKEN_SECRET ?? '';
};

const getSecretRefreshToken = (): string => {
  return process.env.REFRESH_TOKEN_SECRET ?? '';
};

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export { getSecretAccessToken, getSecretRefreshToken, fileFilter };
