const { Router } = require('express');
const ContactController = require('../controllers/ContactController');

const routes = Router();
// Pega todos os elementos

routes.get('/contacts', ContactController.index);

routes.get('/contacts/:id', ContactController.show);

routes.post('/contacts', ContactController.store);

routes.delete('/contacts/:id', ContactController.delete);

// middlewares -> são funções que interceptam as requisições de request e response
// Request <--> Middlewares -> Controller -> Response

module.exports = routes;
