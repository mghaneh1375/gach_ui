import {ActivityIndicator} from 'react-native';
import {MyView} from '../Common';

export const Loader = props => (
  <MyView
    style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(230,230,230,0.8)',
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      position: 'fixed',
      zIndex: 2,
    }}>
    <ActivityIndicator color="green" size="large" />
  </MyView>
);
