// src/router/router.ts
import { Router, Request, Response} from 'express';
import { mainController } from '../controller/MainController';
import { loremIpsum } from 'lorem-ipsum';
import majorController from '../controller/major';
import userController from '../controller/user';
import { checkAuth  } from '../middlewares/checkAuth';

const router = Router();


router.get('/lorem/:qtd', (req: Request, res: Response) => {
  const qtd = parseInt(req.params.qtd, 10);

  if (isNaN(qtd) || qtd <= 0) {
    return res.status(400).send('Parâmetro inválido. Informe um número inteiro positivo.');
  }

  const texto = loremIpsum({
    count: qtd,
    units: 'paragraphs'
  });

  res.send(`<div style="padding: 20px;">${texto.replace(/\n/g, '<br><br>')}</div>`);
});



router.get('/', mainController.index);
router.get('/lorem', mainController.lorem);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/about', mainController.about);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);


//rotas de Major
router.get('/major', majorController.index);
router.get('/major/read/:id', majorController.read);

router.get('/major/create', majorController.create);
router.post('/major/create', majorController.create);

router.get('/major/update/:id', majorController.update);
router.post('/major/update/:id', majorController.update);

router.post('/major/remove/:id', majorController.remove);


//rotas de User
router.get('/user', userController.index);
router.all('/user/create', userController.create);
router.get('/user/read/:id', userController.read);
router.all('/user/update/:id', userController.update);
router.post('/user/remove/:id', userController.remove);


router.get('/login', userController.showLoginForm);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

// Rotas protegidas:
router.get('/game', checkAuth, mainController.game);
//router.get('/game', mainController.game);
router.post('/game/score', checkAuth, mainController.saveScore);

router.get('/ranking', mainController.ranking);


router.get('/user/change-password', checkAuth, userController.changePasswordForm);
router.post('/user/change-password', checkAuth, userController.changePassword);


export default router;
