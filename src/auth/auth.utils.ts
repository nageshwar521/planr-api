import { UserInterface } from './auth.middleware';
import jwt, { Secret } from 'jsonwebtoken';
import { getSecretAccessToken } from '../common/common.utils';

const createAuthToken = (user: UserInterface): string => {
  const secretToken = getSecretAccessToken();
  return jwt.sign(user, secretToken as Secret, { expiresIn: '5m' });
};

export { createAuthToken };
