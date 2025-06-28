import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export default async function AuthUser(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}