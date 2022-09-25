const { Router } = require('express');
const ContactController = require('../controllers/ContactController');
const CategoryController = require('../controllers/CategoryController');

const routes = Router();
// Pega todos os elementos

// Rotas de contatos

routes.get('/contacts', ContactController.index);
routes.get('/contacts/:id', ContactController.show);
routes.post('/contacts', ContactController.store);
routes.delete('/contacts/:id', ContactController.delete);
routes.put('/contacts/:id', ContactController.update);

// Rotas de categories
routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);

// middlewares -> são funções que interceptam as requisições de request e response
// Request <--> Middlewares -> Controller -> Response

module.exports = routes;
