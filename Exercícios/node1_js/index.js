import http from 'http';
import fs from 'fs';
import path from 'path';
import { config} from 'dotenv';
import { fileURLToPath } from 'url';
import {createLink} from './util.js';

config(); //carrega as variáveis de ambiente do arquivo .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//pega o diretório passado como argumento na linha de comando
const directoryPath = process.argv[2];
const port = process.env.PORT || 3333; //porta padrão 3333


const server = http.createServer((req, res) => {
    const url = decodeURI(req.url);

    if (url === '/' || url === '') {
        //página com links para os arquivos do diretório
    fs.readdir(directoryPath, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Erro ao ler o diretório');
            }

            const links = files.map(file => createLink(file)).join('');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(links);
        });
    } else {
        //exibe o conteúdo do arquivo
        const filePath = path.join(directoryPath, url);
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if(err){
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    return res.end('Arquivo não encontrado');
                }

                const voltarLink = `<a href="/">Voltar</a><br><br>`;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(voltarLink + data.replace(/\n/g, '<br>'));
            });
        }
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
