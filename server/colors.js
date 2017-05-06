// const values = '0123'.split('');
const values = '0123456789abcdef'.split('');

const colors = [];

values.forEach((a) => {
  values.forEach((b) => {
    values.forEach((c) => {
      values.forEach((d) => {
        values.forEach((e) => {
          values.forEach((f) => {
            const color = a + b + c + d + e + f;
            colors.push(color);
          });
        });
      });
    });
  });
});

module.exports = colors;
