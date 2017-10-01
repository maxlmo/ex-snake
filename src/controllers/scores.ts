import { Request, Response } from 'express';
import Score from '../model/score';

export let all = (req: Request, res: Response) => {
  Score.findAll<Score>().then(
    data => {
      res.send(JSON.stringify(data));

    }
  );
};
