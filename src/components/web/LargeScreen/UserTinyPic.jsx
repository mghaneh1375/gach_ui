import React, {useState} from 'react';
import {Image} from 'react-native';

function UserTinyPic(props) {
  const [pic, setPic] = useState();
  const defaultStyle = {
    width: 30,
    height: 30,
    borderRadius: 'center',
    alignSelf: 'center',
  };

  React.useEffect(() => {
    setPic(props.pic);
  }, [props.pic]);

  if (pic !== undefined)
    return (
      <Image
        resizeMode="contain"
        style={props.style !== undefined ? props.style : defaultStyle}
        source={{uri: pic}}
      />
    );
  return <></>;
}

export default UserTinyPic;
