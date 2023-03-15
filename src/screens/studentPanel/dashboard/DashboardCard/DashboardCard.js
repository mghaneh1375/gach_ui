import React from 'react';
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
  styleMarginRight,
  styleSubText,
  styleJustifyContentCenter,
  styleFontSize30,
} from './style';

function DashboardCard({
  theme,
  text,
  background,
  subtext,
  borderRight,
  btnColor,
  padding,
  icon,
  onPress,
  width,
  fontSize,
  subFontSize,
}) {
  return (
    <CommonWebBox
      width={width === undefined ? 250 : width}
      theme={theme}
      childStyle={{
        borderColor: theme,
        background: background !== undefined ? background : 'white',
        padding: padding !== undefined ? padding : '10px',

        borderRightWidth: borderRight ? 18 : 0,
      }}
      style={{
        ...styleJustifyContentCenter,
      }}>
      <PhoneView style={{justifyContent: 'space-between'}}>
        <SimpleText
          // fontSize={fontSize !== undefined ? fontSize : 25}
          style={{
            ...styleFontSize25,
            ...styleMarginRight,
            ...{
              color: background !== undefined ? vars.WHITE : vars.DARK_BLUE,
              width: 'max-content',
              fontSize: fontSize !== undefined ? fontSize : 22,
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
      {icon !== undefined && (
        <MyView>
          <EqualTwoTextInputs style={{alignItems: 'end'}}>
            <SimpleText
              style={
                subFontSize !== undefined
                  ? {...{fontSize: subFontSize}, ...styleSubText}
                  : {...styleFontSize30, ...styleSubText}
              }
              text={subtext}
            />
            <FontIcon
              onPress={onPress}
              theme={'rect'}
              back={btnColor}
              icon={icon}
            />
          </EqualTwoTextInputs>
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default DashboardCard;
