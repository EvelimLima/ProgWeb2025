// src/router/router.ts
import { Router } from 'express';
import { MainController } from '../controller/MainController';

const router = Router();

router.get('/hb1', MainController.hb1);
router.get('/hb2', MainController.hb2);
router.get('/hb3', MainController.hb3);
router.get('/hb4', MainController.hb4);

export default router;
