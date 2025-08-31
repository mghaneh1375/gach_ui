import {Platform, View} from 'react-native';

const MyView = props => {
  if (Platform.OS === 'web') {
    let style = props.style;
    if (props.style instanceof Array) style = undefined;

    if (style !== undefined) {
      return (
        <div
          className={props.className === undefined ? 'myView' : props.className}
          style={style}>
          {props.children}
        </div>
      );
    }

    return <div className={'myView'}>{props.children}</div>;
  }

  return <View style={props.style}>{props.children}</View>;
};

export default MyView;
