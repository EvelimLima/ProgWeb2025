//utils/validateEnv.ts

import { cleanEnv, num, str } from "envalid";

export default function validateEnv () { 
    return cleanEnv(process.env, {
        NODE_ENV: str({choices: ['development', 'production']}),
        PORT: str(),
        LOG_PATH: str(),
        LOG_FORMAT: str({choices: ['simples', 'completo']}),
        SESSION_SECRET: str(),
        ROUNDS_BCRYPT: num(),
    });
}