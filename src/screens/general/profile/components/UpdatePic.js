import React, {useState} from 'react';
import translator from '../translate';
import {
  CommonButton,
  PhoneView,
  MyView,
  SimpleText,
  EqualTwoTextInputs,
} from '../../../../styles/Common';
import {Image} from 'react-native';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import Avatar from './Avatar';
import {fetchAvatars} from './Utility';
import {styles} from '../../../../styles/Common/Styles';

const UpdatePic = props => {
  const [pic, setPic] = useState(undefined);
  const [showAvatars, setShowAvatars] = useState(false);
  const [avatars, setAvatars] = useState();
  const [userId, setUserId] = useState();

  const toggleShowChooseAvatar = async () => {
    if (avatars === undefined) {
      let res = await fetchAvatars(props.setLoading, props.token);
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
    <MyView>
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
        resizeMode={'contain'}
        imageStyle={{boxShadow: 'inset 4px 6px 20px 20px'}}
        parentStyle={{boxShadow: 'inset 4px 6px 20px 20px'}}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          borderRadius: '50%',
          border: '8px solid rgb(255, 255, 255)',
          boxShadow: 'rgb(0 0 0 / 16%) 0px 1px 20px',
        }}
        source={{uri: pic}}
      />
      {/* {props.accesses.indexOf('student') !== -1 && ( */}
      <MyView style={{...styles.marginAuto}}>
        <CommonButton
          theme={'dark'}
          onPress={() => toggleShowChooseAvatar()}
          title={translator.chooseAvatar}
        />
        <EqualTwoTextInputs>
          <SimpleText text={'کد معرفی شما:   '} />
          <SimpleText text={props.user.invitationCode} />
        </EqualTwoTextInputs>
        <CommonButton
          onPress={() => props.navigate('/upgrade')}
          title={'درخواست ارتفا سطح'}
        />
      </MyView>
    </MyView>
  );
};
export default UpdatePic;
