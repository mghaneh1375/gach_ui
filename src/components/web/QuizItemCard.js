import React from 'react';
import {MyView, PhoneView, SimpleText} from '../../styles/Common';
import {FontIcon, SimpleFontIcon} from '../../styles/Common/FontIcon';
import {styles} from '../../styles/Common/Styles';
import {getDevice, getWidthHeight} from '../../services/Utility';

function QuizItemCard({
  text,
  val,
  icon,
  textFontSize,
  valFontSize,
  background,
  iconFontSize,
  color,
  iconVal,
  iconColor,
  isBold,
}) {
  const isInPhone = getDevice().indexOf('WebPort') !== -1;
  const width = getWidthHeight()[0];
  if (val === undefined || val === '' || val === '...') return <></>;
  return (
    <PhoneView style={{...styles.alignItemsCenter}}>
      {icon !== undefined && (background === undefined || background) && (
        <FontIcon
          kind={iconFontSize !== undefined ? iconFontSize : 'small'}
          icon={icon}
          back={color === undefined ? 'blue' : color}
          parentStyle={{
            marginLeft: 5,
          }}
        />
      )}
      {icon !== undefined && background !== undefined && !background && (
        <SimpleFontIcon
          kind={iconFontSize !== undefined ? iconFontSize : 'small'}
          icon={icon}
          style={{color: color === undefined ? 'blue' : color}}
          parentStyle={{
            marginLeft: 5,
          }}
        />
      )}

      <MyView>
        <SimpleText
          style={
            isBold === undefined || isBold
              ? {
                  fontSize: textFontSize,
                  ...styles.BlueBold,
                  ...styles.flexWrap,
                }
              : {
                  fontSize: textFontSize,
                  ...styles.dark_blue_color,
                  ...styles.flexWrap,
                }
          }
          text={text}
        />
        {val !== 'icon' && (
          <SimpleText
            style={
              isBold === undefined || isBold
                ? {
                    fontSize: valFontSize,
                    ...styles.BlueBold,
                    ...styles.alignSelfStart,
                    maxWidth: isInPhone ? width - 120 : undefined,
                  }
                : {
                    fontSize: valFontSize,
                    ...styles.dark_blue_color,
                    ...styles.alignSelfStart,
                    maxWidth: isInPhone ? width - 120 : undefined,
                  }
            }
            text={val}
          />
        )}
        {val === 'icon' && (
          <SimpleFontIcon
            style={{color: iconColor}}
            kind={'normal'}
            icon={iconVal}
          />
        )}
      </MyView>
    </PhoneView>
  );
}

export default QuizItemCard;
