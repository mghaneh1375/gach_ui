import {Link} from 'react-router-dom';
import BlueTextInlineElem from './blueTextInline.js';
import {Platform} from 'react-native';

const TextLink = props => {
  let allStyles =
    Platform.OS === 'web'
      ? props.href !== undefined
        ? {
            color: 'white',
            fontFamily: 'IRANSans',
            textDecoration: 'none',
          }
        : {color: 'white', cursor: 'pointer'}
      : {color: 'white'};

  allStyles =
    props.style !== undefined ? {...allStyles, ...props.style} : allStyles;

  return Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <BlueTextInlineElem onPress={props.onPress} style={allStyles}>
      {props.text}
    </BlueTextInlineElem>
  ) : props.href !== undefined ? (
    <Link style={allStyles} to={props.href}>
      {props.text}
    </Link>
  ) : (
    <BlueTextInlineElem onClick={props.onPress} style={allStyles}>
      {props.text}
    </BlueTextInlineElem>
  );
};

export default TextLink;
