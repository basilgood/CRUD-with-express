const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

const fruits = [
  { name: 'apple', quantity: 3, price: 5, unit: 'kg' },
  { name: 'plum', quantity: 5, price: 2, unit: 'kg' },
  { name: 'grape', quantity: 7, price: 7, unit: 'kg' },
];

app.get('/', (req, res) => {
  let list = '';

  for (let i = 0; i < fruits.length; i++) {
    list +=
      '<li>' +
      '<a href="/' +
      fruits[i].name +
      '">' +
      fruits[i].name +
      '</a>' +
      ' - ' +
      fruits[i].price +
      ' / ' +
      fruits[i].unit +
      ' - ' +
      fruits[i].quantity +
      '</li>';
  }

  // list === ''

  // const mappedList = fruits.map((fruit) => '<li>' + fruit.name + '</li>').join('\n');

  const response = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Fruits store</title>
    </head>
    <body>
      <h1>Buna ziua!</h1>
      <h3>Bine ati venit!</h3>
      <p>Puteti cumpara urmatoarele:</p>

      <ul>${list}</ul>
    </body>
  </html>
  `;
  res.send(response);
});

app.post('/buy', (req, res) => {
  let cantitatea = req.body.qty;
  const buyq = `
  <html>
    <head>
      <title>buying page</title>
    </head>
    <body>
      <a href="/">Home</a>
      <p>Ai cumparat ${cantitatea} kile</p>
    </body>
  </html>
`;
  res.send(buyq);
});

app.get('/:fruit', (req, res) => {
  // presupunem ca fructul nu este in lista
  let fructulcautat = null;
  // parcurgem lista
  for (let i = 0; i < fruits.length; i++) {
    // comparam numele fiecarui fruct cu fructul cerut
    if (fruits[i].name === req.params.fruit) {
      fructulcautat = fruits[i];
      break;
    }
  }

  if (fructulcautat) {
    const resp = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${req.params.fruit}</title>
      </head>
      <body>
        <a href="/">Home</a>
        <ul>
          <li>${fructulcautat.name}</li>
          <li>${fructulcautat.quantity} ${fructulcautat.unit}</li>
          <li>${fructulcautat.price} lei</li>
        </ul>
        <form action="/buy" method="POST">
          Cumpara: <input type="text" name="qty" placeholder="cantitatea" required>
          <input type="text" name="fruit" value="${fructulcautat.name}">
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `;
    res.send(resp);
  } else {
    const resp = `
    <html>
      <head>
        <title>error page</title>
      </head>
      <body>
        <a href="/">Home</a>
        <p>404. That’s an error.</p>
      </body>
    </html>
    `;
    res.send(resp);
  }
  // daca fructul cerut exista in lista
  // afiseaza detalii despre fruct
  // daca nu
  // afiseaza eroare ca fructul nu exista
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
