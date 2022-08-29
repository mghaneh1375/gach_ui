import React from 'react';
import {CommonWebBox, PhoneView, SimpleText} from '../../../styles/Common';
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
        padding: props.padding !== undefined ? props.padding : '10px',
        borderRightWidth: 18,
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
              color:
                props.background !== undefined ? vars.WHITE : vars.DARK_BLUE,
              width: 'max-content',
            },
          }}
          text={props.text}
        />
        {props.btnColor === undefined && (
          <SimpleText
            style={{
              ...styleFontSize25,
              ...{color: vars.WHITE, width: 'max-content'},
            }}
            text={'test'}
          />
        )}
      </PhoneView>
    </CommonWebBox>
  );
}

export default MyOffs;
