"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessLogger = accessLogger;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logFolder = process.env.LOG_FOLDER || 'logs';
const logFormat = process.env.LOG_FORMAT || 'completo';
if (!fs_1.default.existsSync(logFolder)) {
    fs_1.default.mkdirSync(logFolder, { recursive: true });
}
function accessLogger(req, res, next) {
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
    const logFilePath = path_1.default.join(logFolder, 'access-${date}.log');
    fs_1.default.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo de log:', err);
        }
    });
    next();
}
