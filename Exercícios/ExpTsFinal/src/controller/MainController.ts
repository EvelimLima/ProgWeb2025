//mainController.ts
import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { Session } from 'express-session';
const prisma = new PrismaClient();

export const mainController = {
  index: (req: Request, res: Response) => {
      res.render('main/index');
  },
  game: (req: Request, res: Response) => {
      res.render('main/game');
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
  },


saveScore: async (req: Request, res: Response) => {
  const { score } = req.body;
  const userId = (req.session as Session & { user?: { id: string } }).user?.id;

  if (!userId || typeof score !== 'number') {
    console.log('Requisição inválida:', { userId, score });
    return res.status(400).json({ message: 'Requisição inválida' });
  }

  try {
    const saved = await prisma.gameSession.create({
      data: { userId, score }
    });

    console.log('Score salvo:', saved); // <— IMPORTANTE
    res.status(200).json({ message: 'Score salvo com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar score:', error);
    res.status(500).json({ message: 'Erro interno ao salvar score' });
  }
},


ranking: async (req: Request, res: Response) => {
    try {
      // Busca os 10 usuários que mais pontuaram (soma dos scores)
      const ranking = await prisma.gameSession.groupBy({
        by: ['userId'],
        _sum: { score: true },
        orderBy: { _sum: { score: 'desc' } },
        take: 10,
      });

      // Pega os dados dos usuários para exibir nome/email (ou outro campo)
      const userIds = ranking.map(r => r.userId);

      const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, fullname: true, email: true }, // ajuste o que quer mostrar
      });

      // Junta os dados do ranking com os dados dos usuários
      const rankingComUsuarios = ranking.map((r, index) => {
        const user = users.find(u => u.id === r.userId);
        return {
          posicao: index + 1,
          userId: r.userId,
          score: r._sum.score,
          name: user?.fullname ?? 'Usuário desconhecido',
          email: user?.email ?? '',
        };
      });
      res.render('main/ranking', { ranking: rankingComUsuarios });

    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
      res.status(500).send('Erro ao carregar ranking');
  }

}

}


