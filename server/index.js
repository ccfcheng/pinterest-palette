require('dotenv').config();
const express = require('express');
const scrapeColor = require('./scraper').scrapeColor;

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/scrape', (req, res) => {
  res.send('Add color to path');
});

app.get('/scrape/:color', (req, res) => {
  const color = req.params.color;
  scrapeColor(color);
  res.send(req.params);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
