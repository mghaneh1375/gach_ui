import React from 'react';
import {CommonWebBox, PhoneView, SimpleText} from '../../../styles/Common';
import {FontIcon} from '../../../styles/Common/FontIcon';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import {
  styleFontSize25,
  styleJustifyContentCenter,
  styleMarginRight,
} from '../dashboard/DashboardCard/style';

function MyOffs(props) {
  return (
    <CommonWebBox
      width={250}
      theme={props.theme}
      childStyle={{
        borderColor: props.theme,
        background: props.background !== undefined ? props.background : 'white',
        // borderRightWidth: 18,
        // borderLeftWidth: 18,
        borderLeftColor: 'white',
      }}
      style={{
        ...styleJustifyContentCenter,
      }}>
      <PhoneView style={{...styles.justifyContentSpaceBetween}}>
        <SimpleText
          style={{
            ...styles.fontSize17,
            ...styleMarginRight,
            ...styles.BlueBold,
            ...{
              color:
                props.background !== undefined ? vars.WHITE : vars.DARK_BLUE,
              width: 'max-content',
            },
          }}
          text={props.text}
        />
        <FontIcon kind={'large'} icon={'circle'}>
          <SimpleText text={17} />
        </FontIcon>
      </PhoneView>
    </CommonWebBox>
  );
}

export default MyOffs;
