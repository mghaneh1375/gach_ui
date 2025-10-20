import {Platform, Text} from 'react-native';
import {FontIcon, SimpleFontIcon} from './FontIcon';
import {getDevice} from '../../services/Utility';
import {
  Button,
  chooseTheme,
  CommonButtonTextStyleAndroid,
  CommonButtonTextStyleWeb,
  CommonButtonTextStyleWebPhone,
} from './button';
import vars from '../root';
import {styles} from './Styles';
import {Link} from 'react-router-dom';

const CommonButton = props => {
  let allStyles = props.style !== undefined ? props.style : {...styles.flexEnd};
  let className = props.theme === 'transparent' ? 'myBtn-Transparent' : 'myBtn';

  if (props.style === undefined || props.style.justifyContent === undefined)
    className += ' flex-end';

  const isInWebPhone =
    Platform.OS === 'web' && getDevice().indexOf('WebPort') !== -1;

  let textStyle =
    Platform.OS === 'web'
      ? isInWebPhone
        ? CommonButtonTextStyleWebPhone
        : CommonButtonTextStyleWeb
      : CommonButtonTextStyleAndroid;

  if (props.textStyle !== undefined)
    textStyle = {
      ...textStyle,
      ...props.textStyle,
    };

  if (props.theme !== undefined) {
    const themeRes = chooseTheme(props.theme, allStyles, textStyle);
    allStyles = themeRes[0];
    textStyle = themeRes[1];
  }

  allStyles.alignSelf =
    props.dir !== undefined && props.dir === 'rtl' ? 'flex-start' : 'flex-end';
  let hrefStyle = {textDecoration: 'none'};
  if (props.href === undefined) {
    allStyles.padding =
      props.padding !== undefined && props.padding === 'unset'
        ? isInWebPhone
          ? 5
          : '9px 15px'
        : props.padding !== undefined
        ? props.padding
        : isInWebPhone
        ? 5
        : '5px 30px';
  } else {
    // allStyles.padding = '5px 0';
    // hrefStyle.padding =
    //   props.padding !== undefined && props.padding === 'unset'
    //     ? isInWebPhone
    //       ? '5px 5px'
    //       : '9px 15px'
    //     : isInWebPhone
    //     ? 5
    //     : '5px 30px';
  }

  if (props.icon !== undefined) {
    allStyles.display = 'flex';
    allStyles.alignItems = 'center';
    allStyles.justifyContent = 'space-around';
  }

  return Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <Button style={allStyles} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </Button>
  ) : props.href !== undefined ? (
    <Button style={allStyles}>
      <Link to={props.href !== undefined ? props.href : '/'} style={hrefStyle}>
        <Text style={textStyle}>{props.title}</Text>
      </Link>
    </Button>
  ) : (
    <div className={className}>
      <Button
        disabled={props.disabled}
        style={allStyles}
        onClick={props.onPress}>
        {props.icon !== undefined &&
          (props.iconDir === undefined || props.iconDir === 'right') && (
            <SimpleFontIcon
              kind={'normal'}
              style={{color: vars.WHITE}}
              icon={props.icon}
              onPress={props.onPress}
            />
          )}
        <Text style={textStyle}>{props.title}</Text>
        {props.icon !== undefined &&
          props.iconDir !== undefined &&
          props.iconTheme === undefined &&
          props.iconDir === 'left' && (
            <SimpleFontIcon
              kind={'normal'}
              style={{color: vars.WHITE}}
              icon={props.icon}
              onPress={props.onPress}
            />
          )}
        {props.icon !== undefined &&
          props.iconDir !== undefined &&
          props.iconTheme !== undefined &&
          props.iconDir === 'left' && (
            <FontIcon
              kind={'small'}
              icon={props.icon}
              onPress={props.onPress}
            />
          )}
      </Button>
    </div>
  );
};

export default CommonButton;
