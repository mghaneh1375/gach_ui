import PhoneView from './PhoneView';
import {RadioButton} from 'react-native-paper';
import SimpleText from './SimpleText';
import JustBottomBorderTextInput from './JustBottomBorderTextInput';
import vars from '../root';

const CommonRadioButton = props => (
  <PhoneView
    style={
      props.style !== undefined
        ? {
            ...{height: props.isCheckBox ? 20 : 60, alignItems: 'center'},
            ...props.style,
          }
        : {height: props.isCheckBox ? 20 : 60, alignItems: 'center'}
    }>
    {props.isCheckBox === undefined && (
      <RadioButton
        color={vars.ORANGE}
        value={props.value}
        status={props.status}
        onPress={props.onPress}
      />
    )}
    {props.isCheckBox !== undefined && (
      <input
        type="checkbox"
        onChange={props.onPress}
        checked={props.status === 'checked'}
      />
    )}

    {(props.type === undefined || props.type === 'simple') && (
      <SimpleText
        style={
          props.textStyle !== undefined
            ? props.textStyle
            : {
                color:
                  props.style === undefined || props.style.color === undefined
                    ? 'black'
                    : props.style.color,
                alignSelf: 'center',
              }
        }
        text={props.text}
      />
    )}
    {props.type !== undefined && props.type === 'textInput' && (
      <JustBottomBorderTextInput
        onChangeText={props.onChangeText}
        justNum={props.justNum}
        placeholder={props.text}
        subText={props.text}
        disable={props.disable}
        value={props.textValue}
      />
    )}
  </PhoneView>
);

export default CommonRadioButton;
