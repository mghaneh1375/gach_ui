import {MyView, PhoneView} from '../styles/CommonComponents.jsx';
import {styles} from '../styles/common/styles';
export const LoadingCommonWebBox = props => (
  <MyView
    style={{
      ...styles.positionAbsolute,
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      backgroundColor: 'rgba(238, 238, 238, 0.71)',
      borderRadius: 7,
      zIndex: 1,
    }}>
    <PhoneView
      style={{
        ...styles.marginAuto,
      }}>
      {props.children}
    </PhoneView>
  </MyView>
);
