import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const logsPath = process.env.LOGS_PATH || 'logs'; 
const logFormat = process.env.LOG_FORMAT || 'simples';

// Cria o diretório de logs se não existir
if (!fs.existsSync(logsPath)) {
    fs.mkdirSync(logsPath, { recursive: true });
}

export const accessLogger = (req: Request, res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    let log = `[${now}] ${req.method} ${req.url}`;

    if (logFormat === 'completo') {
        log += ` ${req.protocol.toUpperCase()} ${req.headers['user-agent']}`;
    }

    log += '\n';

    const logFilePath = path.join(logsPath, 'access.log');

    fs.appendFile(logFilePath, log, (err) => {
        if (err) console.error('Erro ao gravar log:', err);
    });

    next();
};
