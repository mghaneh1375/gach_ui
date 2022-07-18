import React, {useState} from 'react';
import translator from '../translate';
import {CommonButton, PhoneView} from '../../../../styles/Common';
import {Image, View} from 'react-native';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import Avatar from './Avatar';

const UpdatePic = props => {
  const [pic, setPic] = useState(undefined);
  const [showAvatars, setShowAvatars] = useState(false);
  const [avatars, setAvatars] = useState();
  const [userId, setUserId] = useState();

  const toggleShowChooseAvatar = async () => {
    if (avatars === undefined) {
      props.setLoading(true);
      let res = await generalRequest(
        routes.fetchAllAvatars,
        'get',
        undefined,
        'data',
        props.token,
      );
      props.setLoading(false);
      if (res === null) {
        setAvatars([]);
        return;
      }
      setAvatars(res);
    } else if (avatars.length === 0) return;
    setShowAvatars(!showAvatars);
  };

  React.useEffect(() => {
    if (pic === undefined) setPic(props.user.pic);
  }, [pic, props.user.pic]);

  React.useEffect(() => {
    if (userId === undefined && props.isAdmin) setUserId(props.user.id);
  }, [props.user.id, props.isAdmin, userId]);
  return (
    <View style={{zIndex: 5}}>
      {showAvatars && (
        <LargePopUp toggleShowPopUp={toggleShowChooseAvatar}>
          {avatars !== undefined && (
            <PhoneView>
              {avatars.map((elem, index) => {
                return (
                  <Avatar
                    key={index}
                    token={props.token}
                    setLoading={props.setLoading}
                    avatarId={elem.id}
                    pic={elem.file}
                    userId={userId}
                    setPic={setPic}
                    toggleShowChooseAvatar={toggleShowChooseAvatar}
                    updateUserPic={props.updateUserPic}
                  />
                );
              })}
            </PhoneView>
          )}
        </LargePopUp>
      )}
      <Image
        resizeMode="contain"
        style={{width: 200, height: 200, alignSelf: 'center'}}
        source={{uri: pic}}
      />
      {/* {props.accesses.indexOf('student') !== -1 && ( */}
      <CommonButton
        theme={'dark'}
        onPress={() => toggleShowChooseAvatar()}
        title={translator.chooseAvatar}
      />
      {/* )} */}
    </View>
  );
};
export default UpdatePic;
