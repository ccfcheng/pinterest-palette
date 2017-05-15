const request = require('request');
const cheerio = require('cheerio');
const db = require('./db.js');
// const colors = require('./colors');

const COLOR_SOURCE_URL = process.env.COLOR_SOURCE_URL || '';

// const colors = [
//   '000000',
//   'aaaaaa',
//   'fdd2e6',
//   '99aa00',
// ];

const brands = [
  'behr',
  'glidden',
  'benjamin-moore',
  'kelly-moore',
  'valspar-paint',
  'sherwin-williams',
  'pantone-pms',
];

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
  request(url, (err, res, html) => {
    if (err) {
      console.error(err);
    } else {
      const $ = cheerio.load(html);
      const colorInfo = getColorInfo($);
      db.ref(`colors/${color}`).set({
        brand,
        name: colorInfo.name,
        hex: colorInfo.hex,
      });
      console.log(`${brand} for ${color}:`, getColorInfo($));
    }
  });
};

const scrapeColorBrands = (color) => {
  brands.forEach((brand) => {
    scrapeColor(color, brand);
  });
};

// const scrapeAll = () => {
//   colors.forEach((color) => console.log(color));
//   console.log(colors);
//   colors.forEach((color, i) => scrapeColor(color, 'sherwin-williams', i * 100))
//   brands.forEach((brand) => {
//     colors.forEach((color) => {
//       scrapeColor(color, brand);
//     });
//   });
// };

module.exports = {
  scrapeColorBrands,
};
