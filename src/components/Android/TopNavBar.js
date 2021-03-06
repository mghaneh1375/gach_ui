import {View, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

export function TopNavBar() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        elevation: 10,
        backgroundColor: 'white',
        height: 60,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={{width: '100%', height: '90%'}}
          resizeMode="contain"
          source={require('./../../images/irysc.png')}
        />
      </TouchableOpacity>
    </View>
  );
}
