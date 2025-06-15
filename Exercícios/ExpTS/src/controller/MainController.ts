// src/controller/MainController.ts
import { Request, Response } from 'express';

export class MainController {

  static async hb1(req: Request, res: Response) {
    res.render('hb1', { layout: false });
  }

  static async hb2(req: Request, res: Response) {
    res.render('hb2', { layout: false });
  }
  
  static async hb3(req: Request, res: Response) {
    res.render('hb3', { 
      layout: false, 
      professors: [
        { nome:'David Fernandes', sala:'1238' },
        { nome:'Horácio Fernandes', sala:'1237' }
      ] 
    });
  }
  
  static async hb4(req: Request, res: Response) {
    const technologies = [
      { name: 'Express', type:'Framework', poweredByNodejs: true },
      { name:'Laravel', type:'Framework', poweredByNodejs: false },
      { name:'React', type:'Library', poweredByNodejs: true },
      { name:'Handlebars', type:'Engine View', poweredByNodejs: true },
      { name:'Django', type:'Framework', poweredByNodejs: false },
      { name:'Docker', type:'Virtualization', poweredByNodejs: false },
      { name:'Sequelize', type:'ORM tool', poweredByNodejs: true }
    ];

    res.render('hb4', { layout: false, technologies });
  }
}
