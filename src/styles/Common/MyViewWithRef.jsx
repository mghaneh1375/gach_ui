import React from 'react';
import {Platform, View} from 'react-native';

const MyViewWithRef = React.forwardRef((props, ref) => {
  if (Platform.OS === 'web') {
    let style = props.style;
    if (props.style instanceof Array) style = undefined;

    if (style !== undefined) {
      return (
        <div
          ref={ref}
          className={props.className === undefined ? 'myView' : props.className}
          style={style}>
          {props.children}
        </div>
      );
    }

    return (
      <div ref={ref} className={'myView'}>
        {props.children}
      </div>
    );
  }

  return (
    <View ref={ref} style={props.style}>
      {props.children}
    </View>
  );
});

export default MyViewWithRef;
