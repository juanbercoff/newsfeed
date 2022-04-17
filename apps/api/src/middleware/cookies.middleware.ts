import { Injectable, NestMiddleware, Req } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestWithCookie } from '@newsfeed/data';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CookiesMiddleware implements NestMiddleware {
  use(req: RequestWithCookie, res: Response, next: NextFunction) {
    if (!req.cookies?.visits) {
      const cookieValue = uuidv4();
      res.cookie('visits', cookieValue, {
        expires: DateTime.now().plus({ years: 5 }).toJSDate(),
      });
      req.cookies.visits = cookieValue;
    }
    next();
  }
}
