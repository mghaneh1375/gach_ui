import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import commonTranslator from '../../../../translator/Common';
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
              text={
                state.bookmarks[state.currIdx] === undefined ||
                !state.bookmarks[state.currIdx]
                  ? Translate.addBookmark
                  : Translate.deleteBookmark
              }
            />
            <SimpleFontIcon
              onPress={() => {
                let b =
                  state.bookmarks[state.currIdx] === undefined ||
                  !state.bookmarks[state.currIdx]
                    ? true
                    : false;
                dispatch({bookmarkStatus: b, needUpdateBookmarks: true});
              }}
              kind={'normal'}
              style={{
                color:
                  state.bookmarks[state.currIdx] === undefined ||
                  !state.bookmarks[state.currIdx]
                    ? '#CCCCCC'
                    : vars.ORANGE_RED,
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
