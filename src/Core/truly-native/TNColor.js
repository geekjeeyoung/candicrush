import invert from 'invert-color';

/*
when Appearance.getColorScheme() === 'dark'
set the color inverted
}
*/

const TNColor = (hexStringColor) => {
  return invert(hexStringColor);
};

export default TNColor;
