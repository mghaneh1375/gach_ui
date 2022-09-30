import React, {useState} from 'react';
import {Image, Pressable} from 'react-native';
import {PhoneView} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';

function SymbolsFace(props) {
  return (
    <PhoneView style={{...styles.gap5, ...styles.alignSelfCenter}}>
      {/* //frist */}
      <Pressable
        onPress={() => {
          props.setLevel('hard');
        }}>
        {props.level !== 'hard' && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F6252.png')}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          props.setLevel(undefined);
        }}>
        {props.level === 'hard' && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F625.png')}
          />
        )}
      </Pressable>
      {/* second */}
      <Pressable
        onPress={() => {
          props.setLevel('mid');
        }}>
        {props.level !== 'mid' && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F620.png')}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          props.setLevel(undefined);
        }}>
        {props.level === 'mid' && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F6202.png')}
          />
        )}
      </Pressable>
      {/* third */}
      <Pressable
        onPress={() => {
          props.setLevel('easy');
        }}>
        {props.level !== 'easy' && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F600.png')}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          props.setLevel(undefined);
        }}>
        {props.level === 'easy' && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F6002.png')}
          />
        )}
      </Pressable>
    </PhoneView>
  );
}

export default SymbolsFace;
