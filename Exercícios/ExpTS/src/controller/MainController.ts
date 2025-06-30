//mainController.ts
import { Request, Response } from 'express';


export const mainController = {
  index: (req: Request, res: Response) => {
      res.render('main/index');
  },

  lorem: (req: Request, res: Response) => {
      res.render('main/lorem');
  },

  bemvindo: (req: Request, res: Response) => {
      const nome = req.params.nome;
      res.render('main/bemvindo', { nome });
  },

  about: (_req: Request, res: Response) => {
    res.render('main/about', { title: 'Sobre o Jogo Space Shooter' });
  },


  hb1: (req: Request, res: Response) => {
  res.render('main/hb1', { faculdade: 'Universidade Federal do Amazonas' });
  },


  hb2: (req: Request, res: Response) => {
    res.render('main/hb2', { isNode: true });
  },

  
  hb3: (req: Request, res: Response) => {
    res.render('main/hb3', {
      professores: [
        { nome: 'David Fernandes', sala: '1238' },
        { nome: 'Horácio Fernandes', sala: '1233' },
        { nome: 'Eldeno Moura', sala: '1236' },
        { nome: 'Elaine Harada', sala: '1231' }
      ]
    });
  },


  hb4: (req: Request, res: Response) => {
    const technologies = [
      { name:'Express', type:'Framework', poweredByNodejs: true },
      { name:'Laravel', type:'Framework', poweredByNodejs: false },
      { name:'React', type:'Library', poweredByNodejs: true },
      { name:'Handlebars', type:'Engine View', poweredByNodejs: true },
      { name:'Django', type:'Framework', poweredByNodejs: false },
      { name:'Docker', type:'Virtualization', poweredByNodejs: false },
      { name:'Sequelize', type:'ORM tool', poweredByNodejs: true }
    ];

    res.render('main/hb4', { title:'Tecnologias baseadas no NodeJS', technologies });
  }
};

