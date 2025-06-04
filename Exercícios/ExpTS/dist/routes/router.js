"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lorem_ipsum_1 = require("lorem-ipsum");
const router = (0, express_1.Router)();
const lorem = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: { min: 4, max: 8 },
    wordsPerSentence: { min: 4, max: 16 },
});
router.get('/lorem/:qtd', (req, res) => {
    const qtd = parseInt(req.params.qtd);
    if (isNaN(qtd) || qtd <= 0) {
        return res.status(400).send('Parâmetro inválido. Envie um número maior que 0.');
    }
    const paragraphs = lorem.generateParagraphs(qtd);
    res.send(`<pre>${paragraphs}</pre>`);
});
exports.default = router;
