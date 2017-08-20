const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const saudacoes = require('./presentation/saudacoes');
const clientes = require('./presentation/clientes');

const index = require('./presentation/index');

let app = express();

nunjucks.configure('./views', {autoescape: true, express: app});

app.use(methodOverride('_method'));
app.set('view engine', 'htm');
app.use(bodyParser.urlencoded({extended: false}));
app.use(saudacoes);
app.use(clientes);
app.use(index);

app.listen(8801, function() {
    console.info('Running... on port 8801');
});

module.exports = app;



