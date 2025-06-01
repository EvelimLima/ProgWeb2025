import express, {Request, Response} from 'express';
import validateEnv from './utils/validateEnv';  
import { accessLogger } from './middlewares/logger';

import dotenv from 'dotenv';
//import morgan from 'morgan';

dotenv.config();

validateEnv();
// Importando o express e o validateEnv
const app = express();

app.use(accessLogger); // Usando o middleware de logger

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});