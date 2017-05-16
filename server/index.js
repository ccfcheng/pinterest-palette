require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { scrapeColor } = require('./scraper');
const { fetchColorInfo, fetchPaletteInfo } = require('./colors');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/info/:color/:brand', (req, res) => {
  const color = req.params.color;
  const brand = req.params.brand;
  fetchColorInfo(color, brand)
    .then((info) => {
      res.send(info);
    })
    .catch((err) => console.error('fetchColorInfo error:', err));
});

app.post('/colors/palette', (req, res) => {
  console.log('body:', req.body);
  fetchPaletteInfo(req.body)
    .then((values) => res.send(values));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
