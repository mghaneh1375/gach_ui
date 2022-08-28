import {
  faAngleLeft,
  faAngleRight,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../tranlates/Common';
import Translate from '../Translate';
import {doQuizContext, dispatchDoQuizContext} from './Context';

function Bookmark(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  return (
    <CommonWebBox>
      <EqualTwoTextInputs>
        <SimpleText
          style={{...styles.BlueBold}}
          text={
            commonTranslator.question +
            ' ' +
            Translate.number +
            ' ' +
            (state.currIdx + 1)
          }
        />

        {!props.isInReviewMode && (
          <PhoneView
            style={{
              ...styles.justifyContentCenter,
              ...styles.alignItemsCenter,
            }}>
            <SimpleText
              style={{...styles.colorOrange, ...styles.FontWeight600}}
              text={Translate.addBookmark}
              // onPress={() => toggleBookmark()}
            />
            <SimpleFontIcon
              //   onPress={() => toggleBookmark()}
              kind={'normal'}
              style={{
                ...styles.colorOrange,
              }}
              icon={faBookmark}
            />
          </PhoneView>
        )}
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Bookmark;
