import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import { accessLogger } from './middlewares/logger';
import router from './router/router';

import { engine } from 'express-handlebars';
import path from 'path';

dotenv.config();
validateEnv();

const app = express();
//app.use(accessLogger);

app.use((req, _res, next) => {
  console.log(`Rota acessada: ${req.url}`);
  next();
});


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
  //console.log(`Servidor rodando na porta http://localhost:${PORT}/hb3`);
});