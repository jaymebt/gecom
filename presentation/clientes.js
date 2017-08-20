const express = require('express');
const {clientes} = require('../cadastro/cadastros');

let self = express.Router();

function transformarClienteParaATela(clienteNaBase) {
    return {
        nome: clienteNaBase.CadRazaoSocial,
        codigo: clienteNaBase.CadId,
        endereco: clienteNaBase.CadEnd
    };
}

self.get('/cliente/new', function(request, response, next) {
    response.render('novoCliente.html');
});

self.get('/cliente', function(request, response, next) {
    clientes.listarTodos().then((clientesDaBase) => {
        let listaDeClientesParaTela = clientesDaBase.map(c => transformarClienteParaATela(c));

        let modeloParaView = {clientes: listaDeClientesParaTela}
        
        response.render('clientes.html', modeloParaView);
    });
});

self.post('/cliente', function(request, response, next) {
    let novaInstancia = {nome: request.body.nome};

    let responderSucesso = resultado => {
        let id = resultado.insertId;
        response.redirect(`/cliente/${id}`);
    };

    let responderErro = error => response.json(error);

    clientes.novo(novaInstancia)
        .then(responderSucesso, responderErro)
        .catch(responderErro);
});

self.get(/^\/cliente\/(\d+)\/?$/, function(request, response, next) {
    let codigo = request.params[0];

    clientes.buscarPorCodigo(codigo).then((cliente) => {
        response.render('umCliente.html', transformarClienteParaATela(cliente));
    });
});

self.get(/^\/cliente\/(\d+)\/editar\/?$/, function(request, response, next) {
    let codigo = request.params[0];
    clientes.buscarPorCodigo(codigo).then((cliente) => {
        response.render('editarCliente.html', transformarClienteParaATela(cliente));
    });   
});

self.get(/^\/cliente\/(\d+)\/excluir\/?$/, function(request, response, next) {
    let codigo = request.params[0];
    clientes.buscarPorCodigo(codigo).then((cliente) => {
        response.render('excluirCliente.html', transformarClienteParaATela(cliente));
    });   
});

self.put(/^\/cliente\/(\d+)\/?$/, function(request, response, next) {
    let novaVersao = {
        codigo: request.params[0],
        nome: request.body.nome
    };

    clientes.atualizar(novaVersao).then((resultado) => {
        response.render('umCliente.html', novaVersao);
    });
});

self.delete(/^\/cliente\/(\d+)\/?$/, function(request, response, next) {
    let codigo = request.params[0];

    clientes.excluirPorCodigo(codigo).then((sucesso) => {
        response.redirect('/cliente');
    });
});

self.get('/cliente/inativos', function(request, response, next) {
    clientes.listarInativos().then((clientesDaBase) => {
        let listaDeClientesParaTela = clientesDaBase.map(c => transformarClienteParaATela(c));

        let modeloParaView = {clientes: listaDeClientesParaTela}
        
        response.render('clientes.html', modeloParaView);
    });
});

module.exports = self;