import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private logger = morgan('dev'); // formatação do log

  use(req: Request, res: Response, next: NextFunction) {
    this.logger(req, res, next);
  }
}
