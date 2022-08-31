import React from 'react';
import {Pressable, View} from 'react-native';
import Circle from '../../../../components/web/Circle';
import {
  BigBoldBlueTextInline,
  EqualTwoTextInputs,
  MyView,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';

function ProgressCard(props) {
  return (
    <MyView style={{...styles.padding10, width: props.width}}>
      <Pressable
        onPress={props.onPress}
        style={{
          ...styles.padding10,
          ...styles.boxShadow,
          ...styles.borderRadius10,
        }}>
        <MyView
          style={{
            ...styles.positionAbsolute,
            ...styles.top0,
            ...styles.right0,
            width: props.percent,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '100%',
            backgroundColor: props.theme,
          }}></MyView>
        {props.header !== undefined && (
          <EqualTwoTextInputs>
            <BigBoldBlueTextInline
              style={{
                color: props.color !== undefined ? props.color : vars.DARK_BLUE,
                paddingRight: 30,
              }}
              text={props.header}
            />
            <Circle
              text={10}
              color={vars.WHITE}
              diameter={25}
              backgroundColor={vars.DARK_BLUE}
            />
          </EqualTwoTextInputs>
        )}
      </Pressable>
    </MyView>
  );
}

export default ProgressCard;
