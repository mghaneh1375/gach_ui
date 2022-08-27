import React from 'react';
import {MyView, PhoneView, SimpleText} from '../../styles/Common';
import {FontIcon} from '../../styles/Common/FontIcon';
import {styles} from '../../styles/Common/Styles';

function QuizItemCard({text, val, icon, textFontSize, valFontSize}) {
  if (val === undefined || val === '' || val === '...') return <></>;
  return (
    <PhoneView style={{...styles.alignItemsCenter}}>
      {icon !== undefined && (
        <FontIcon kind={'small'} icon={icon} parentStyle={{marginLeft: 5}} />
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
