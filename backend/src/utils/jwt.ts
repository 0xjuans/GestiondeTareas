/**
 * Utilidades para JWT
 */

import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  username: string;
  email: string;
  rol_id: number;
  rol_nombre: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as TokenPayload;
  } catch (error) {
    return null;
  }
};
