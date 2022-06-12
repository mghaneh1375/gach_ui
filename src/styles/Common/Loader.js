import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {getWidthHeight} from '../../services/Utility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)',
    height: getWidthHeight()[1],
    top: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export const Loader = props => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator color="green" size="large" />
  </View>
);
