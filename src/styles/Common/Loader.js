import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {getWidthHeight} from '../../services/Utility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(230,230,230,0.8)',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 2,
  },
});

export const Loader = props => (
  <View style={[styles.container]}>
    <ActivityIndicator color="green" size="large" />
  </View>
);
