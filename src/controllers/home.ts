import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export class HomeController {
  index(req: Request, res: Response) {
    res.send('Welcome to snake express server.');
  }

}
