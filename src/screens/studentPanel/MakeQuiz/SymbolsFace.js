import React, {useState} from 'react';
import {Image, Pressable} from 'react-native';
import {PhoneView} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';

function SymbolsFace() {
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  const [selected, setSelected] = useState();

  return (
    <PhoneView style={{...styles.gap5, ...styles.alignSelfCenter}}>
      {/* //frist */}
      <Pressable
        onPress={() => {
          setFirst(!first);
          setSecond(false);
          setThird(false);
          setSelected('first');
        }}>
        {!first && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F6252.png')}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          setThird(false);
          setSecond(false);
          setFirst(false);
        }}>
        {first && (
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
          setSecond(!second);
          setThird(false);
          setFirst(false);
          setSelected('second');
        }}>
        {!second && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F620.png')}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          setThird(false);
          setSecond(false);
          setFirst(false);
        }}>
        {second && (
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
          setThird(!third);
          setSecond(false);
          setFirst(false);
          setSelected('third');
        }}>
        {!third && (
          <Image
            style={{width: 35, height: 35}}
            resizeMode="contain"
            source={require('../../../images/PngSymbol/1F600.png')}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          setThird(false);
          setSecond(false);
          setFirst(false);
        }}>
        {third && (
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
