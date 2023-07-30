import {Image} from 'react-native';
import React, {useState} from 'react';

function LastBuyer(props) {
  const [hover, setHover] = useState(false);

  const tooltipStyle = {
    display: hover ? 'block' : 'none',
  };

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{
        width: 40,
        marginRight:
          props.isJustOne === undefined || !props.isJustOne ? -10 : 5,
        display: 'flex',
        gap: 5,
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Image
        source={props.pic}
        resizeMode={'contain'}
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '40px',
          border: '1px solid',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          ...tooltipStyle,
          ...{
            // position: 'absolute',
            // top: 45,
            // left: 60 - 30 * props.index,
            textAlign: 'left',
            backgroundColor: 'white',
            color: '#777',
            fontSize: 10,
            padding: '3px 15px',
            borderRadius: 7,
            border: '1px solid #777',
            fontFamily: 'IRANSans',
            width: 'max-content',
          },
        }}>
        {props.text}
      </div>
    </div>
  );
}

export default LastBuyer;
