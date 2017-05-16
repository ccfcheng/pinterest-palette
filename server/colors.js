const db = require('./db');
const scrapeColor = require('./scraper').scrapeColor;

const fetchColorInfo = (color, brand) => {
  const colorRef = db.ref(`colors/${color}/${brand}`);
  return colorRef.once('value')
    .then((snapshot) => {
      const value = snapshot.val();
      if (value) {
        return value;
      }
      return scrapeColor(color, brand);
    })
};

const fetchPaletteInfo = (palette) => {
  const paletteArray = [];
  paletteArray.push(palette.color0);
  paletteArray.push(palette.color1);
  paletteArray.push(palette.color2);
  paletteArray.push(palette.color3);
  paletteArray.push(palette.color4);
  paletteArray.push(palette.color5);
  const promises = paletteArray.map((color) => fetchColorInfo(color, palette.brand));
  return Promise.all(promises);
};

module.exports = {
  fetchColorInfo,
  fetchPaletteInfo,
};
