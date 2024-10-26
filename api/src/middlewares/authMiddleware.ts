import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ error: 'access denied' });
    return;
  }
  try {
    // decode the jwt token data
    const decoded = jwt.verify(token, 'iwuwyou');
    console.log(decoded);
    if (typeof decoded !== 'object' || !decoded?.userId) {
      res.status(401).json({ error: 'Acess denied' });
      return;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Access denied' });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== 'seller') {
    res.status(401).json({ error: 'You are not a seller' });
    return;
  }
  next();
}
