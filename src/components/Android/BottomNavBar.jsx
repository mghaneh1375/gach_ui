import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, Text} from 'react-native';
import {
  NavContainerStyle,
  NavItemContainerStyle,
  NavItemImageStyle,
  NavItemStyle,
} from '../../styles/android/bottomNavBar';
import {MyView} from '@/styles';
export default function BottomNavBar(props) {
  const navigation = useNavigation();
  return !props.show ? null : (
    <MyView style={NavContainerStyle}>
      <MyView style={NavItemContainerStyle}>
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
      </MyView>
      {/* <MyView style={NavItemContainerStyle}>
        <MyView style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/support.png')}
          />
        </MyView>
        <Text>پشتیبانی</Text>
       </MyView> */}
      <MyView style={NavItemContainerStyle}>
        <MyView style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/support.png')}
          />
        </MyView>
        <Text>دوره‌های آموزشی</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <MyView style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/exam.png')}
          />
        </MyView>
        <Text>آزمون‌ها</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <MyView style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/rank.png')}
          />
        </MyView>
        <Text>رتبه بندی</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <MyView style={NavItemStyle}>
          <Image
            style={NavItemImageStyle}
            resizeMode="contain"
            source={require('./../../images/exam.png')}
          />
        </MyView>
        <Text>آزمون‌ها</Text>
      </MyView>
    </MyView>
  );
}
