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
  secondary: '#43B2FF',
  success: '#95F9E3',
  warning: '#D4B483',
  error: '#C1666B',
  inputPlaceholderColor: '#b6b8b7',
  darkGrey: '#333333',
  carouselDotsColour: 'rgba(0, 158, 183, 0.9)',
  inactiveCarouselDotsColour: 'rgba(0, 158, 183, 0.4)',
  greyShadow: '#00000029',
  lightGrey: '#F7F7FA',
  darkerGrey: '#707070',
  green: '#70FF66',
  darkGreen: '#2da725',
  orange: '#FFD766',
  darkTangerine: '#FBAD15',
  lynch: '#78849E',
  darkBackground: '#292e42',
  mapPlotLine: 'rgba(112,112,112, 0.3)',
  mapCircleGreen: 'rgba(178, 239, 155, 0.6)',
  headerButtonBackgroundWhite: 'rgba(255, 255, 255, 0.8)',
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
  primary: 'Poppins-Regular',
  secondary: 'Poppins-SemiBold',
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
