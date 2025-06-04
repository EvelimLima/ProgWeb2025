"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const logger_1 = require("./middlewares/logger");
const router_1 = __importDefault(require("./routes/router"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
app.use(logger_1.accessLogger);
app.use('/', router_1.default); // Isso é importante!
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
