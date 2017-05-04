require('dotenv').config();
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const scrapeAll = require('./scraper').scrapeAll;

const app = express();

const PORT = process.env.PORT || 8080;

const COLOR_SOURCE_URL = process.env.COLOR_SOURCE_URL || '';

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/scrape', (req, res) => {
  scrapeAll();
  res.send('Scraping...');
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
