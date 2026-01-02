import { TextStyle } from 'react-native';
import { s } from 'react-native-size-matters';

type Typography = {
  timer: TextStyle;
  body: TextStyle;
};

const typography: Typography = {
  timer: {
    fontSize: s(56),
    fontWeight: '700',
  },
  body: {
    fontSize: s(14),
    fontWeight: '400',
  },
};

export default typography;