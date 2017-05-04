const request = require('request');
const cheerio = require('cheerio');

const COLOR_SOURCE_URL = process.env.COLOR_SOURCE_URL || '';

const colors = [
  '000000',
  'aaaaaa',
  'fdd2e6',
  '99aa00',
];

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
  let info;
  $('#palette').filter(function() {
    const data = $(this);
    info = data
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
  });
  return info;
};

const scrapeColor = (color, brand) => {
  const url = `${COLOR_SOURCE_URL}/${color}/${brand}`;
  request(url, (err, res, html) => {
    if (err) {
      console.error(err);
    } else {
      const $ = cheerio.load(html);
      console.log(`${brand} for ${color}:`, getColorInfo($));
    }
  });
};

const scrapeAll = () => {
  brands.forEach((brand) => {
    colors.forEach((color) => {
      scrapeColor(color, brand);
    });
  });
};

module.exports = {
  scrapeAll,
};