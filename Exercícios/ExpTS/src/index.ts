//index.ts
import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import { accessLogger } from './middlewares/logger';
import router from './router/router';
import { engine } from 'express-handlebars';
import path from 'path';
import { filterByNodeList  } from './views/helpers/helpers'; //ex: 2-parte 6
import { equal } from 'joi';


dotenv.config();
validateEnv();

const app = express();
//app.use(accessLogger); //middleware de logger

app.engine('handlebars', engine({ 
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, 'views', 'layouts'),
  helpers: {
    filterByNodeList: filterByNodeList
  }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, '..', 'public')));


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
  //console.log(`Servidor rodando na porta http://localhost:${PORT}/hb3`);

});