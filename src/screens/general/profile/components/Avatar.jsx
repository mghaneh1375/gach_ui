import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {getUser} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../tranlates/Common';

function Avatar(props) {
  const [pic, setPic] = useState(undefined);

  React.useEffect(() => {
    setPic(props.pic);
  }, [props.pic]);

  const choose = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.setAvatarAsMyPic + props.avatarId,
        'put',
        undefined,
        'file',
        props.token,
      ),
    ]).then(async res => {
      props.setLoading(false);
      if (res[0] !== undefined) {
        await props.updateUserPic(res[0]);
        props.toggleShowChooseAvatar();
        showSuccess(commonTranslator.success);
      }
    });
  };

  return (
    <TouchableOpacity
      onPress={() => choose()}
      style={{
        width: 100,
        height: 100,
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          alignSelf: 'center',
        }}
        source={{uri: pic}}
      />
    </TouchableOpacity>
  );
}

export default Avatar;
