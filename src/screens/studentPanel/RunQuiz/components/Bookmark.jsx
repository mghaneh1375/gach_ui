import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '@/styles';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import {styles} from '@/styles/common/styles';
import vars from '@/styles/root';
import commonTranslator from '@/translator/common';
import Translate from '../translate';
import {doQuizContext, dispatchDoQuizContext} from './Context.jsx';
import {useTheme} from 'styled-components';
function Bookmark(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const theme = useTheme();

  return (
    <CommonWebBox>
      <EqualTwoTextInputs>
        <SimpleText
          style={{
            color: theme.colors.text,
            fontWeight: 600,
          }}
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
              style={{
                ...styles.colorOrange,
                ...styles.FontWeight600,
              }}
              text={
                state.bookmarks[state.currIdx] === undefined ||
                !state.bookmarks[state.currIdx]
                  ? Translate.addBookmark
                  : Translate.deleteBookmark
              }
            />
            <SimpleFontIcon
              onPress={() => {
                const b =
                  state.bookmarks[state.currIdx] === undefined ||
                  !state.bookmarks[state.currIdx]
                    ? true
                    : false;
                dispatch({
                  bookmarkStatus: b,
                  needUpdateBookmarks: true,
                });
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
