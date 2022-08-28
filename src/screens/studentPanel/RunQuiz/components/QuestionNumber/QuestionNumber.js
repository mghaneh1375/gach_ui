import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {PhoneView, SimpleText} from '../../../../../styles/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';

function QuestionNumber(props) {
  const [bookMark, setBookMark] = useState();
  const toggleBookMark = () => {
    setBookMark(!bookMark);
  };

  return (
    <PhoneView
      style={{
        ...styles.questionNo,
        border:
          props.theme !== undefined && props.theme === 'transparent'
            ? '2px solid #000'
            : {},
        backgroundColor:
          props.theme !== undefined && props.theme === 'transparent'
            ? vars.WHITE
            : vars.GREEN,
      }}>
      {props.bookmark !== 0 && (
        <PhoneView style={{...styles.bookMarkWrapper}}>
          <FontIcon
            kind={'tiny'}
            back={'transparent'}
            icon={faBookmark}
            style={{
              padding: 0,
              color: props.bookmark === 1 ? vars.ORANGE_RED : vars.DARK_WHITE,
            }}
            onPress={() => toggleBookMark()}
          />
        </PhoneView>
      )}
      <SimpleText
        style={{
          ...styles.colorWhite,
          ...styles.marginAuto,
          color:
            props.theme !== undefined && props.theme === 'transparent'
              ? vars.DARK_BLUE
              : vars.WHITE,
        }}
        text={props.number}
      />
    </PhoneView>
  );
}

export default QuestionNumber;
