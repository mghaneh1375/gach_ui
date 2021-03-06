import {Platform} from 'react-native';

const vars = {
  NAV_BAR_H: '55px',
  YELLOW: '#FFAA00',
  ORANGE: '#FFAA00',
  ORANGE_RED: '#FF6600',
  WHITE: '#FFFFFF',
  transparent: '#FFFFFF00',
  BLACK: '#000000',
  DARK_WHITE: '#EEEEEE',
  DARK_BLUE: '#013243',
  LIGHT_SILVER: '#707070',
  RED: '#FF0000',
  GRADIENT: 'linear-gradient(to left, #FFAA00, #FF6600)',
  alignSelf: Platform.OS === 'web' ? 'flex-start' : 'flex-end',
  alignSelfRev: Platform.OS === 'web' ? 'flex-end' : 'flex-start',
  flexDirection: Platform.OS === 'web' ? 'row' : 'row-reverse',
  flexDirectionRev: Platform.OS === 'web' ? 'row-reverse' : 'row',
};

export default vars;
