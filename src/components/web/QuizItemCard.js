import React from 'react';
import {MyView, PhoneView, SimpleText} from '../../styles/Common';
import {FontIcon} from '../../styles/Common/FontIcon';
import {styles} from '../../styles/Common/Styles';

function QuizItemCard({text, val, icon, textFontSize, valFontSize}) {
  return (
    <PhoneView style={{...styles.alignItemsCenter}}>
      <FontIcon kind={'small'} icon={icon} parentStyle={{marginLeft: 5}} />
      <MyView>
        <SimpleText
          style={{
            fontSize: textFontSize === 11 ? 11 : textFontSize === 13 ? 13 : 15,
            ...styles.BlueBold,
          }}
          text={text}
        />
        <SimpleText
          style={{
            fontSize: valFontSize === 11 ? 11 : valFontSize === 13 ? 13 : 15,
            ...styles.BlueBold,
          }}
          text={val}
        />
      </MyView>
    </PhoneView>
  );
}

export default QuizItemCard;
