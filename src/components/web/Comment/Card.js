import React, {useState} from 'react';
import {MyView, PhoneView, SimpleText} from '../../../styles/Common';
import {Image} from 'react-native';

function Card(props) {
  const [pic, setPic] = useState();
  React.useEffect(() => {
    setPic(props.comment.student.pic);
  }, [props.comment.student.pic]);

  return (
    <PhoneView style={{alignItems: 'center', gap: '10px'}}>
      <MyView>
        <Image
          resizeMode="contain"
          style={{
            width: '75px',
            height: '75px',
            alignSelf: 'center',
          }}
          source={{uri: pic}}
        />
        <SimpleText
          style={{textAlign: 'center', fontSize: '11px'}}
          text={props.comment.student.name}
        />
        <SimpleText
          style={{textAlign: 'center', fontSize: '11px'}}
          text={props.comment.createdAt}
        />
      </MyView>
      <SimpleText text={props.comment.comment} />
    </PhoneView>
  );
}

export default Card;
