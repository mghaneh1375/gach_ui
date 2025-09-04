import React from 'react';

import vars from './../root';
import {Image, Pressable} from 'react-native';
import {BlueTextInline, MyView} from '../Common';

export const RoleCard = props => (
  <Pressable
    onPress={props.onPress}
    style={({pressed}) => [
      {
        backgroundColor: '#FFFFFFD6',
        shadowColor: '#757575',
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 18,
        elevation: 3,
        width: '46%',
        marginRight: 4,
        marginLeft: 4,
        height: 130,
        borderRadius: 20,
        direction: 'row-reverse',
      },
      props.style !== undefined ? props.style : {},
      pressed ? {opacity: 0.9} : {},
    ]}>
    <MyView>
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
        style={{
          fontWeight: '900',
          alignSelf: 'center',
          marginTop: 10,
          color: props.color !== undefined ? props.color : vars.DARK_BLUE,
        }}
        text={props.text}
      />
    </MyView>
  </Pressable>
);
