const fetch = require('node-fetch');
const cheerio = require('cheerio');
const db = require('./db.js');

const COLOR_SOURCE_URL = process.env.COLOR_SOURCE_URL || '';

const getColorInfo = ($) => {
  const result = {};
  $('#palette').filter(function() {
    const data = $(this);
    const info = data
      .children('ul')
      .first()
      .children('li')
      .last()
      .children('ul')
      .first()
      .children('li')
      .first()
      .children('a')
      .first()
      .text();
    const infoArray = info.split(' / ');
    const hex = infoArray.pop();
    const name = infoArray.length === 1 ? infoArray[0] : infoArray.join(' - ');
    result.hex = hex;
    result.name = name;
  });
  return result;
};

const scrapeColor = (color, brand) => {
  const url = `${COLOR_SOURCE_URL}/${color}/${brand}`;
  return fetch(url)
    .then((res) => res.text())
    .then((text) => {
      const colorInfo = getColorInfo(cheerio.load(text));
      db.ref(`colors/${color}/${brand}`).set({
        name: colorInfo.name,
        hex: colorInfo.hex,
      });
      return colorInfo;
    });
};

module.exports = {
  scrapeColor,
};
