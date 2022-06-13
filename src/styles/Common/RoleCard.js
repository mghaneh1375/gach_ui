import vars from './../root';
import {Platform, View, Image, Pressable} from 'react-native';
import {BlueTextInline} from '../Common';

export const RoleCard = props => (
  <Pressable
    onPress={props.onPress}
    style={({pressed}) => [
      {
        backgroundColor: '#FFFFFFD6',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 20,
        elevation: 3,
        width: '46%',
        marginRight: 4,
        marginLeft: 4,
        height: 130,
        borderRadius: 1,
        direction: 'row-reverse',
      },
      props.style !== undefined ? props.style : {},
      pressed ? {opacity: 0.9} : {},
    ]}>
    <View>
      <Image
        resizeMode="contain"
        style={{
          width: 70,
          height: 70,
          marginTop: 20,
          tintColor: props.color,
          alignSelf: 'center',
        }}
        source={props.source}
      />
      <BlueTextInline
        style={[
          {
            fontWeight: '900',
            alignSelf: 'center',
            marginTop: 10,
          },
          props.color !== undefined
            ? {color: props.color}
            : {color: vars.DARK_BLUE},
        ]}
        text={props.text}
      />
    </View>
  </Pressable>
);
