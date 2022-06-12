import {Text, View, Image, Pressable} from 'react-native';

import {
  NavItemStyle,
  NavItemContainerStyle,
  NavItemImageStyle,
  NavContainerStyle,
} from '../../styles/Android/BottomNavBar';

import {useNavigation} from '@react-navigation/native';

export default function BottomNavBar(props) {
  const navigation = useNavigation();

  return !props.show ? null : (
    <View style={NavContainerStyle}>
      <View style={NavItemContainerStyle}>
        <Pressable
          style={NavItemStyle}
          onPress={() => navigation.navigate('Login')}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/sign-in.png')}
          />
        </Pressable>
        <Text>ورود/ثبت نام</Text>
      </View>
      <View style={NavItemContainerStyle}>
        <View style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/support.png')}
          />
        </View>
        <Text>پشتیبانی</Text>
      </View>
      <View style={NavItemContainerStyle}>
        <View style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/exam.png')}
          />
        </View>
        <Text>آزمون ها</Text>
      </View>
      <View style={NavItemContainerStyle}>
        <View style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/rank.png')}
          />
        </View>
        <Text>رتبه بندی</Text>
      </View>
      <View style={NavItemContainerStyle}>
        <View style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/exam.png')}
          />
        </View>
        <Text>آزمون ها</Text>
      </View>
    </View>
  );
}
