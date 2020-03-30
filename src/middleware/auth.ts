import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Verificar el Token
export const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({msg: 'Access Denied'});
    let payload = jwt.verify(token, 'Seed-Desarrollo');
    next();
}