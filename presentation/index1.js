const express = require('express');

let modelo = require('./modelo.json');

let self = express.Router();

self.get('/index', function(request, response, next) {
    
    modelo.nome = request.query.nome || 'Fulano';

    console.info(request.query.outroParametro);

    response.render('index.html', modelo);
});

self.get('/saudacao/grego', function(request, response, next) {
    response.render('desconhecido.html');
});

module.exports = self;