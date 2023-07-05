import React from 'react';
import {MyView, PhoneView, SimpleText} from '../../styles/Common';
import {FontIcon, SimpleFontIcon} from '../../styles/Common/FontIcon';
import {styles} from '../../styles/Common/Styles';

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
}) {
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
          style={{
            fontSize: textFontSize,
            ...styles.BlueBold,
            ...styles.flexWrap,
          }}
          text={text}
        />
        {val !== 'icon' && (
          <SimpleText
            style={{
              fontSize: valFontSize,
              ...styles.BlueBold,
              ...styles.alignSelfStart,
            }}
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
