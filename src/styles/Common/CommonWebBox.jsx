import {faArrowLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from 'styled-components';
import BigBoldBlueTextInline from './BigBoldBlueTextInline';
import EqualTwoTextInputs from './EqualTwoTextInputs';
import {FontIcon} from './FontIcon';
import MyView from './MyView';
import PhoneView from './PhoneView';
import SimpleText from './SimpleText';
import {styles} from './styles.js';

const CommonWebBox = props => {
  const theme = useTheme();
  const style1 = {
    direction: 'rtl',
    padding: 10,
    width: props.width !== undefined ? props.width : 'auto',
  };

  const allStyle = props.style
    ? {...style1, ...props.style, backgroundColor: 'unset'}
    : {...style1};

  return (
    <MyView style={allStyle}>
      <MyView
        style={{
          overflow: props.rowId ? 'hidden' : 'visible',
          backgroundColor: props.style?.backgroundColor
            ? props.style?.backgroundColor
            : theme.colors.background.modal,
          padding:
            props.style === undefined || props.style.padding === undefined
              ? 10
              : props.style.padding,
          ...props.childStyle,
          boxShadow: '0px 3px 16px 4px rgb(0 0 0 / 16%)',
          borderRadius: 10,
          gap: props.no_gap === undefined || !props.no_gap ? 15 : 0,
        }}>
        {props.rowId !== undefined && (
          <>
            <PhoneView
              style={{
                ...styles.circleBoxUp,
              }}>
              <SimpleText
                style={{
                  ...styles.circleNumberBox,
                }}
                text={props.rowId}
              />
            </PhoneView>
            <PhoneView
              style={{
                ...styles.circleBoxDown,
              }}></PhoneView>
          </>
        )}
        {props.header !== undefined && (
          <EqualTwoTextInputs>
            <BigBoldBlueTextInline
              style={{
                // alignSelf: 'center',
                marginRight: props.rowId !== undefined ? 45 : 0,
              }}
              text={props.header}
            />
            {props.btn !== undefined && props.btn}
            {(props.addBtn !== undefined || props.backBtn !== undefined) && (
              <PhoneView style={{gap: 10, marginBottom: 10, text: 'center'}}>
                {props.addBtn !== undefined && props.addBtn && (
                  <FontIcon
                    onPress={props.onAddClick}
                    theme="rect"
                    kind="normal"
                    back={'yellow'}
                    icon={faPlus}
                  />
                )}
                {props.backBtn !== undefined && props.backBtn && (
                  <FontIcon
                    onPress={props.onBackClick}
                    theme="rect"
                    kind="normal"
                    icon={faArrowLeft}
                  />
                )}
              </PhoneView>
            )}
          </EqualTwoTextInputs>
        )}
        {props.child !== undefined && props.child}
        {props.children !== undefined && props.children}
      </MyView>
    </MyView>
  );
};

export default CommonWebBox;
