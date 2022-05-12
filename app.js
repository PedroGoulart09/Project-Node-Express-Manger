const express = require('express');
const bodyParser = require('body-parser');
const routerProduct = require('./routes/products.route');
const routerSale = require('./routes/sales.route');

const app = express();
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use(routerProduct);
app.use(routerSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
