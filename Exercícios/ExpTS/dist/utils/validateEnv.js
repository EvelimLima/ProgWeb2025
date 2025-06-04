"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateEnv;
const envalid_1 = require("envalid");
function validateEnv() {
    return (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)({ choices: ['development', 'production'] }),
        PORT: (0, envalid_1.str)(),
        LOG_FOLDER: (0, envalid_1.str)(),
        LOG_FORMAT: (0, envalid_1.str)({ choices: ['simples', 'completo'] }),
    });
}
