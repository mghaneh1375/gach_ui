import React from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
  MyView,
  commonStyles,
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

function DashboardCard({theme, text, background, subtext, btnColor, padding}) {
  return (
    <CommonWebBox
      width={250}
      theme={theme}
      childStyle={{
        ...{
          borderColor: theme,
          background: background !== undefined ? background : 'white',
          padding: padding !== undefined ? padding : '10px',
          borderRightWidth: btnColor !== undefined ? 18 : '',
        },
      }}
      style={{
        ...styleJustifyContentCenter,
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
          <EqualTwoTextInputs style={{alignItems: 'end'}}>
            <SimpleText
              style={{...styleFontSize30, ...styleSubText}}
              text={subtext}
            />
            <FontIcon theme={'rect'} back={btnColor} icon={faPlus} />
          </EqualTwoTextInputs>
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default DashboardCard;
