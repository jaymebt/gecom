const mySql = require('mysql');

function connect() {
    return mySql.createConnection({
        host: 'server01',
        port: '3306',
        user: 'root',
        password: 'J8t##$6&*&6',
        database: 'mpferramentas'
    });
}

let clientes = {
    listarTodos: function() {
        return new Promise((resolve, reject) => {
            let statement = 'select * from cadastrogeral where cadtipo = \'CL\' order by cadrazaosocial';
            let connection = connect();
            connection.query(statement, (error, results) => {
                connection.end();
                resolve(results);
            });
        });
    },
    buscarPorCodigo: function(codigo) {
        return new Promise((resolve, reject) => {
            let statement = 'select * from cadastrogeral where cadid = ?';
            let connection = connect();
            connection.query(statement, codigo, (error, results, fields) => {
                connection.end();
                if (error) {
                    reject(error);
                } else {
                    if (results.length == 0)
                        resolve(null);
                    else
                        resolve(results[0]);
                }
            });
        });
    },
    novo: function(cliente) {
        return new Promise((resolve, reject) => {
            let statement = 'insert into cadastrogeral(CadRazaoSocial, CadTipo) values (?, \'CL\')';
            let connection = connect();
            let values = [cliente.nome];
            connection.query(statement, values, (error, results, fields) => {
                connection.end();
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    atualizar: function(clienteModificado) {
        return new Promise((resolve, reject) => {
            let nome = clienteModificado.nome;
            let codigo = clienteModificado.codigo;
            let statement = `update cadastrogeral set CadRazaoSocial = '${nome}' where cadid = ${codigo}`;
            let connection = connect();
            connection.query(statement, (error, results, fields) => {
                connection.end();
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    excluirPorCodigo: function(codigo) {
        return new Promise((resolve, reject) => {
            let statement = `delete from cadastrogeral where cadid = ${codigo}`;
            let connection = connect();
            connection.query(statement, (error, results, fields) => {
                connection.end();
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
}

let fornecedores = {

}

module.exports = {clientes, fornecedores};