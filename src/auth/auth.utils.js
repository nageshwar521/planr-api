import jwt from 'jsonwebtoken';
import { getSecretAccessToken } from '../common/common.utils';

const createAuthToken = (user) => {
  const secretToken = getSecretAccessToken();
  return jwt.sign(user, secretToken, { expiresIn: '5m' });
};

export { createAuthToken };
