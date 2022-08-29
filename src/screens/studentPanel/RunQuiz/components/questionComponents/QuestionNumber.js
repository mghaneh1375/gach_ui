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
      {props.bookmark !== 'hidden' && (
        <PhoneView
          style={
            props.bookmark === 'fill'
              ? {...styles.bookMarkWrapper}
              : {...styles.bookMarkWrapperWithBorder}
          }>
          <FontIcon
            kind={'tiny'}
            back={'transparent'}
            icon={faBookmark}
            style={{
              padding: 0,
              color: props.bookmark === 'fill' ? vars.ORANGE_RED : '#CCCCCC',
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
