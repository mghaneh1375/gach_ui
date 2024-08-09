import {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {MyView, PhoneView, SimpleText} from '../../../styles/Common';
import vars from '../../../styles/root';
import {styles} from '../../../styles/Common/Styles';

function BestComment(props) {
  const [pic, setPic] = useState();

  useEffect(() => {
    setPic(props.student.pic);
  }, [props.student.pic]);

  return (
    <MyView
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '7px',
        width: '200px',
        height: '200px',
        boxShadow: '0px 3px 6px #00000029',
        position: 'relative',
      }}>
      <PhoneView style={{...styles.justifyContentCenter}}>
        <PhoneView
          style={{
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            marginTop: '-70px',
            backgroundColor: 'white',
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
              alignSelf: 'center',
            }}
            source={{uri: pic}}
          />
        </PhoneView>
      </PhoneView>
      <SimpleText
        style={{textAlign: 'center', marginTop: '10px', fontSize: '12px'}}
        text={props.student.name}
      />
      <SimpleText
        style={{color: vars.DARK_BLUE, fontWeight: 'bold', fontSize: '12px'}}
        text={props.reference}
      />
      <SimpleText
        style={{fontSize: '12px', marginTop: '5px'}}
        text={props.comment}
      />
      <SimpleText
        style={{
          fontSize: '11px',
          position: 'absolute',
          bottom: '5px',
          left: '5px',
        }}
        text={props.createdAt}
      />
    </MyView>
  );
}

export default BestComment;
