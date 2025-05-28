// parte I
const http = require('http');
const fs = require('fs');
const path = require('path');
//parte II
require('dotenv').config(); //carrega as variáveis de ambiente do arquivo .env
const{createLink} = require('./util'); //importa a função createLink do arquivo util.js Parte 6


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
