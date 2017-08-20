const express = require('express');

let modelo = require('./modelo.json');

let self = express.Router();

self.get('/index', function(request, response, next) {
    response.render('index.html', modelo);
});

self.get('/titulo', function(request, response, next) {
    response.render('titulo.html', modelo);
});

self.get('/menu', function(request, response, next) {
    response.render('menu.html', modelo);
});

self.get('/painel', function(request, response, next) {
    response.render('paineldecontrole.html', modelo);
});

module.exports = self;