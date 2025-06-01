import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logFolder = process.env.LOG_FOLDER || 'logs';
const logFormat = process.env.LOG_FORMAT || 'completo';

if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder, { recursive: true });
}

export function accessLogger(req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    let logMessage = `[${timestamp}] ${method} ${url}`;

    if (logFormat === 'completo') {
        const httpVersion = req.httpVersion;
        const userAgent = req.get('User-Agent') || 'Unknown';
        logMessage += ` HTTP/${httpVersion} UA: ${userAgent}`;
    }

    logMessage += '\n';

    const date = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const logFilePath = path.join(logFolder, 'access-${date}.log');

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo de log:', err);
        }
    });

    next();
}
