import { Console } from 'console';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hb1', (_req: Request, res: Response) => {
  console.log('Rota /hb1 acessada');
  res.render('hb1', { layout: false });
});

router.get('/hb2', (_req: Request, res: Response) => {
  console.log('Rota /hb2 acessada');
  res.render('hb2',  { layout: false });
});

router.get('/hb3', (_req: Request, res: Response) => {
  console.log('Rota /hb3 acessada');
  res.render('hb3', {
    layout: false,
    professores: [
      { nome: 'David Fernandes', sala: '1238' },
      { nome: 'Horácio Fernandes', sala: '1237' },
      { nome: 'Edenlo Moura', sala: '1236' },
      { nome: 'Elaine Harada', sala: '1234' },
    ]
  });
});

router.get('/hb4', (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true }
  ];

  res.render('hb4', { layout: false,
    technologies: technologies,});
});


export default router;
