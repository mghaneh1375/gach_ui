import {ActivityIndicator} from 'react-native';
import {MyView} from '../Common';
import vars from '../root';

export const Loader = props => (
  <MyView
    style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: vars.darkTransparent,
      color: vars.ORANGE_RED,
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      position: 'fixed',
      zIndex: 2,
    }}>
    <ActivityIndicator color={vars.ORANGE_RED} size="large" />
  </MyView>
);
