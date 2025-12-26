import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  private corsOptions = {
    origin: ['http://localhost:5050'], // liberando apenas localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  };

  use(req: Request, res: Response, next: NextFunction) {
    cors(this.corsOptions)(req, res, next);
  }
}
