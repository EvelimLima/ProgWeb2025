import express, { Request, Response, Router } from 'express';
import { LoremIpsum, loremIpsum } from 'lorem-ipsum';

const router = Router();

// Rota raiz
/*
router.get('/', (_req, res, ) => {
  res.send('Rota Raiz');
});
*/

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

router.get('/lorem/:qtd', (req: Request, res: Response) => {
  const qtd = parseInt(req.params.qtd, 10);
  
  const text = lorem.generateParagraphs(qtd);
  res.send('<pre>{text}</pre>');
});

export default router;