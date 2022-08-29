import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {PhoneView, SimpleText} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';

function QuestionNumber(props) {
  return (
    <PhoneView
      style={{
        ...styles.questionNo,
        borderWidth:
          props.selected !== undefined && props.selected
            ? 2
            : props.theme !== undefined && props.theme === 'transparent'
            ? 1
            : 0,
        borderType: 'solid',
        borderColor:
          props.selected !== undefined && props.selected
            ? vars.ORANGE_RED
            : vars.DARK_SILVER,
        backgroundColor:
          props.theme !== undefined && props.theme === 'transparent'
            ? vars.WHITE
            : vars.DARK_BLUE,
      }}>
      {props.bookmark !== 'hidden' && (
        <PhoneView
          style={
            (props.theme !== undefined && props.theme === 'transparent') ||
            (props.selected !== undefined && props.selected)
              ? {...styles.bookMarkWrapperWithBorder}
              : {...styles.bookMarkWrapper}
          }>
          <SimpleFontIcon
            kind={'small'}
            icon={faBookmark}
            style={{
              padding: 0,
              color: props.bookmark === 'fill' ? vars.ORANGE_RED : '#CCCCCC',
            }}
            onPress={() => props.onChange()}
          />
        </PhoneView>
      )}
      <SimpleText
        style={{
          ...styles.cursor_pointer,
          ...styles.colorWhite,
          ...styles.marginAuto,
          color:
            props.theme !== undefined && props.theme === 'transparent'
              ? vars.DARK_BLUE
              : vars.WHITE,
        }}
        text={props.number}
        onPress={() => props.jump()}
      />
    </PhoneView>
  );
}

export default QuestionNumber;
