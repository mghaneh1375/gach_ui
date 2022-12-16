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
        <SimpleText
          style={{
            fontSize: valFontSize,
            ...styles.BlueBold,
            ...styles.alignSelfStart,
          }}
          text={val}
        />
      </MyView>
    </PhoneView>
  );
}

export default QuizItemCard;
