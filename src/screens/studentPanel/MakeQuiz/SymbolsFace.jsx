import React from 'react';
import {Image, Pressable} from 'react-native';
import {PhoneView} from '../../../styles/Common';
import {styles} from '../../../styles/common/styles';
function SymbolsFace(props) {
  return (
    <PhoneView
      style={{
        ...styles.alignSelfCenter,
      }}>
      {/* //frist */}
      <PhoneView
        style={{
          paddingLeft: 10,
        }}>
        <Pressable
          onPress={() => {
            props.setLevel('hard');
          }}>
          {props.level !== 'hard' && (
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              resizeMode="contain"
              source={require('../../../images/symbol/5.png')}
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            props.setLevel(undefined);
          }}>
          {props.level === 'hard' && (
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              resizeMode="contain"
              source={require('../../../images/symbol/6.png')}
            />
          )}
        </Pressable>
      </PhoneView>
      {/* second */}
      <PhoneView
        style={{
          paddingLeft: 10,
        }}>
        <Pressable
          onPress={() => {
            props.setLevel('mid');
          }}>
          {props.level !== 'mid' && (
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              resizeMode="contain"
              source={require('../../../images/symbol/3.png')}
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            props.setLevel(undefined);
          }}>
          {props.level === 'mid' && (
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              resizeMode="contain"
              source={require('../../../images/symbol/4.png')}
            />
          )}
        </Pressable>
      </PhoneView>
      {/* third */}
      <PhoneView
        style={{
          paddingLeft: 10,
        }}>
        <Pressable
          onPress={() => {
            props.setLevel('easy');
          }}>
          {props.level !== 'easy' && (
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              resizeMode="contain"
              source={require('../../../images/symbol/1.png')}
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            props.setLevel(undefined);
          }}>
          {props.level === 'easy' && (
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              resizeMode="contain"
              source={require('../../../images/symbol/2.png')}
            />
          )}
        </Pressable>
      </PhoneView>
    </PhoneView>
  );
}
export default SymbolsFace;
