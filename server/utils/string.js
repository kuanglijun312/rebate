import crypto from 'crypto';

export const getRandomString = (length = 6) => {
  return crypto.randomBytes(length).toString('hex');
}