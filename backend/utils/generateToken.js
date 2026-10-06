import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'business_jwt_secret_key_2026_super_secure', {
    expiresIn: '30d',
  });
};
