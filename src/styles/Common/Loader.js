import {ActivityIndicator} from 'react-native';
import commonTranslator from '../../translator/Common';
import {MyView, PhoneView, SimpleText} from '../Common';
import vars from '../root';
import {styles} from './Styles';

export const Loader = props => (
  <MyView
    style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: vars.darkTransparent,
      color: vars.ORANGE_RED,
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      position: 'fixed',
      zIndex: 2,
    }}>
    <MyView>
      <ActivityIndicator color={vars.ORANGE_RED} size="large" />
      <SimpleText
        style={{
          ...styles.marginAuto,
          ...styles.BlueBold,
          ...styles.fontSize20,
          ...styles.colorOrangeRed,
          ...styles.marginTop20,
        }}
        text={
          props.text !== undefined
            ? props.text
            : commonTranslator.pleaseWait + ' ' + commonTranslator.processRunnig
        }
      />
    </MyView>
  </MyView>
);
