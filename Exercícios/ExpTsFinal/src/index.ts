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
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';


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

app.use(session({
  genid: () => uuidv4(),
  secret: process.env.SESSION_SECRET as string,
  resave: true,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.session = req.session; // torna disponível em todos os .handlebars
  next();
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);


const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
  //console.log(`Servidor rodando na porta http://localhost:${PORT}/hb3`);

});