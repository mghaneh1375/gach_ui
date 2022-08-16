import React from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../styles/Common';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import vars from '../../../../styles/root';
import {
  styleFontSize25,
  styleBorderRight,
  styleMarginRight,
  styleSubText,
  styleJustifyContentCenter,
  styleFontSize30,
} from './style';

function DashboardCard({theme, text, background, subtext, btnColor, counter}) {
  return (
    <CommonWebBox
      width={250}
      style={{
        ...styleJustifyContentCenter,
        ...styleBorderRight,
        ...{
          borderColor: theme,
          backgroundImage: background !== undefined ? background : 'white',
          borderRightWidth: background !== undefined ? 0 : 18,
        },
      }}>
      <PhoneView style={{justifyContent: 'space-between'}}>
        <SimpleText
          style={{
            ...styleFontSize25,
            ...styleMarginRight,
            ...{
              color: background !== undefined ? vars.WHITE : vars.DARK_BLUE,
              width: 'max-content',
            },
          }}
          text={text}
        />
        {btnColor === undefined && (
          <SimpleText
            style={{
              ...styleFontSize25,
              ...{color: vars.WHITE, width: 'max-content'},
            }}
            text={subtext}
          />
        )}
      </PhoneView>
      {btnColor !== undefined && (
        <MyView>
          <EqualTwoTextInputs>
            <SimpleText
              style={{...styleFontSize30, ...styleSubText}}
              text={subtext}
            />
            <FontIcon
              kind={'normal'}
              theme={'rect'}
              back={btnColor}
              icon={faPlus}
            />
          </EqualTwoTextInputs>
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default DashboardCard;
