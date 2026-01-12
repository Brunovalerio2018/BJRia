import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  private corsOptions = {
    origin: ['http://localhost:5050/api#', 
             'http://localhost:3000'], // liberando apenas localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH',  'OPTIONS',  'UPDATE'],
    credentials: true,
  };
  
  use(req: Request, res: Response, next: NextFunction) {
    cors(this.corsOptions)(req, res, next);
  }
}
