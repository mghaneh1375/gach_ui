import {Pressable} from 'react-native';
import Circle from '../../../../components/web/Circle.jsx';
import {BigBoldBlueTextInline, EqualTwoTextInputs, MyView} from '@/styles';
import {styles} from '@/styles/common/styles.js';
import vars from '@/styles/root';
function ProgressCard(props) {
  return (
    <MyView
      style={{
        ...styles.padding10,
        width: props.width,
      }}>
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
          }}
        />
        {props.header !== undefined && (
          <EqualTwoTextInputs>
            <BigBoldBlueTextInline
              style={{
                color: props.color !== undefined ? props.color : vars.DARK_BLUE,
                paddingRight: 30,
              }}
              text={props.header}
            />
            {props.circleText !== undefined && (
              <Circle
                text={props.circleText}
                color={vars.WHITE}
                diameter={25}
                backgroundColor={vars.DARK_BLUE}
              />
            )}
          </EqualTwoTextInputs>
        )}
      </Pressable>
    </MyView>
  );
}
export default ProgressCard;
