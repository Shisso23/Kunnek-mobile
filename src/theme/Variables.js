/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  black: '#000',
  text: '#212529',
  primary: '#068D9D',
  secondary: '#53599A',
  success: '#95F9E3',
  warning: '#D4B483',
  error: '#C1666B',
  lightGrey: '#f2f2f2',
  inputPlaceholderColor: '#b6b8b7',
  darkGrey: '#333333',
  carouselDotsColour: 'rgba(0, 158, 183, 0.9)',
  inactiveCarouselDotsColour: 'rgba(0, 158, 183, 0.4)',
  greyShadow: '#00000029',
};

export const NavigationColors = {
  primary: Colors.primary,
};

/**
 * FontSize
 */
export const FontSize = {
  small: 12,
  regular: 14,
  large: 18,
};

export const FontFamily = {
  primary: 'system font',
  secondary: 'system font',
};

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};
