const express = require('express');
const { randomUUID } = require('node:crypto');
const fs = require('fs');

const app = express();

app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

app.post('/products', (request, response) => {
  const { name, price } = request.body;

  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

  recreateProductFile();

  return response.json(product);
});

app.get('/products', (request, response) => {
  return response.json(products);
});

app.get('/products/:id', (request, response) => {
  const { id } = request.params;
  const productFound = products.find((product) => product.id === id);
  return response.json(productFound);
});

app.put('/products/:id', (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);

  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  recreateProductFile();

  return response.json(products[productIndex]);
});

app.delete('/products/:id', (request, response) => {
  const { id } = request.params;

  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  recreateProductFile();

  return response.json(products);
});

function recreateProductFile() {
  fs.writeFile('products.json', JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Success');
    }
  });
}

app.listen(3000, () => console.log('Server running on port 3000'));
