import { Request, Response } from 'express';

export const mainController = {
  hb1: (req: Request, res: Response) => {
    res.render('hb1', { title:'Página HB1' });
  },
  hb2: (req: Request, res: Response) => {
    res.render('hb2', { title:'Página HB2' });
  },
  hb3: (req: Request, res: Response) => {
    res.render('hb3', { title:'Página HB3', professores: [
      { nome:'David Fernandes', sala:'1238' },
      { nome:'Horácio Fernandes', sala:'1237' }
    ]});
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

    res.render('hb4', { title:'Tecnologias baseadas no NodeJS', technologies });
  }
};

