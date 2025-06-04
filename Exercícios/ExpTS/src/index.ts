import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import { accessLogger } from './middlewares/logger';
import router from './router/router';

dotenv.config();
validateEnv();


const app = express();
//app.use(accessLogger);

app.use("/",router); 


const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
