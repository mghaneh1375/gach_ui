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
import commonTranslator from '../../../../tranlates/Common';
import Translate from '../Translate';

function Bookmark() {
  return (
    <CommonWebBox>
      <EqualTwoTextInputs>
        <SimpleText
          style={{...styles.BlueBold}}
          text={commonTranslator.question + ' ' + Translate.number}
        />
        <PhoneView
          style={{...styles.justifyContentCenter, ...styles.alignItemsCenter}}>
          <SimpleText
            style={{...styles.colorOrange, ...styles.FontWeight600}}
            text={Translate.addBookmark}
            // onPress={() => toggleBookmark()}
          />
          <PhoneView>
            <SimpleFontIcon
              //   onPress={() => toggleBookmark()}
              style={{
                ...styles.colorOrange,
              }}
              icon={faBookmark}
            />
          </PhoneView>
        </PhoneView>
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Bookmark;
