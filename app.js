const express = require('express');
const app = express();
const port = 3000;

const fruits = [
  { name: 'apple', quantity: 3, price: 5, unit: 'kg' },
  { name: 'plum', quantity: 5, price: 2, unit: 'kg' },
  { name: 'grape', quantity: 7, price: 7, unit: 'kg' }
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

app.get('/:fruit', (req, res) => {
  res.send('I\'m an ' + req.params.fruit);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
