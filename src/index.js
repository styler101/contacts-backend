const express = require('express');

const app = express();


app.get('/', (request, response) =>{
  return response.send(`<h1> Teste </h1>`);
})

app.listen(3001, () => console.log(`Server is runing at http://localhost:3001`))