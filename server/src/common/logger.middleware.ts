import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req['user'] = decoded.email;
      next();
    } catch (err) {
      console.log(err, "err")
      throw new UnauthorizedException('Invalid token');
    };
  }
}