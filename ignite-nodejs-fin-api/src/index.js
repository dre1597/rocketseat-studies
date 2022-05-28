const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({ error: 'Customer not found!' });
  }

  request.customer = customer;

  return next();
}

function getBalance(statements) {
  const balance = statements.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    }
    return acc - operation.amount;
  }, 0);

  return balance;
}
/**
 * cpf - string
 * name - string
 * id - uuid
 * statements []
 */

app.post('/accounts', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already Exists!' });
  }

  customers.push({ id: uuid(), cpf, name, statements: [] });

  return response.status(201).send();
});

// app.use(verifyIfExistsAccountCPF);

app.get('/statements/:cpf', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statements);
});

app.post('/deposits/:cpf', verifyIfExistsAccountCPF, (request, response) => {
  const { amount, description } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer.statements.push(statementOperation);

  return response.status(201).send();
});

app.post('/withdraws/:cpf', verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statements);

  if (balance < amount) {
    return response.status(400).json({ error: 'Insufficient funds!' });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
  };

  customer.statements.push(statementOperation);

  return response.status(201).send();
});

app.get(
  '/statements/:cpf/date',
  verifyIfExistsAccountCPF,
  (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + ' 00:00');

    const statements = customer.statements.filter(
      (statement) =>
        statement.created_at.toDateString() ===
        new Date(dateFormat).toDateString()
    );

    return response.json(statements);
  }
);

app.put('/accounts/:cpf', verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
});

app.get('/accounts/:cpf', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

app.get('/accounts', (request, response) => {
  return response.json(customers);
});

app.delete('/accounts/:cpf', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return response.status(204);
});

app.get('/balances/:cpf', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statements);
  return response.json(balance);
});

app.listen(3000);
