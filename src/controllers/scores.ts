import { Request, Response } from 'express';
import Score from '../model/score';

export let all = (req: Request, res: Response) => {
  Score.findAll<Score>().then(
    data => {
      res.send(JSON.stringify(data));

    }
  );
};

export let add = (req: Request, res: Response) => {
  const body = req.body as Score;
  const score = new Score({ name: body.name, score: body.score });
  score.save().then(
    () => res.status(201).send(JSON.stringify(score))
  );
};
