const express = require('express');
const corsMiddlewares = require('./app/middlewares/cors');
const routes = require('./app/routes');
// Precisamos dizer para o express que ele precisa trabalhar com json
const app = express();
app.use(express.json());

app.use(corsMiddlewares);

app.use(routes);

app.listen(3001, () => console.log('Server is runing at http://localhost:3001'));
