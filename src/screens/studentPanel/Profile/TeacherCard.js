import {useEffect, useState} from 'react';
import {CommonWebBox, MyView, SimpleText} from '../../../styles/Common';
import {Image} from 'react-native';
import {Rating} from 'react-native-ratings';
import {styles} from '../../../styles/Common/Styles';

function TeacherCard(props) {
  const [pic, setPic] = useState();
  useEffect(() => {
    setPic(props.teacher.pic);
  }, [props.teacher.pic]);
  return (
    <CommonWebBox>
      <MyView
        style={{
          width: 150,
          height: 200,
          alignItems: 'center',
        }}>
        <MyView
          style={{
            width: 100,
            height: 100,
            marginTop: '20px',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            source={pic}
          />
          <SimpleText
            style={{...{textAlign: 'center'}, ...styles.BlueBold}}
            text={props.teacher.name}
          />
          {props.teacher.rate !== 0 && (
            <>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                fractions={0}
                style={{
                  direction: 'ltr',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
                startingValue={props.teacher.rate}
              />
            </>
          )}
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default TeacherCard;
