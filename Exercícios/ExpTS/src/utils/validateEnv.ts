import { cleanEnv, str } from "envalid";

export default function validateEnv () { 
    return cleanEnv(process.env, {
        NODE_ENV: str({choices: ['development', 'production']}),
        PORT: str(),
        LOG_FOLDER: str(),
        LOG_FORMAT: str({choices: ['simples', 'completo']}),
    });
}