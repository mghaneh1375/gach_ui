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
import UploadFile from '../../../../components/web/UploadFile';
import {routes} from '../../../../API/APIRoutes';
import {fetchUser, setCacheItem} from '../../../../API/User';
import {Slider} from '@material-ui/core';

const UpdatePic = props => {
  const [pic, setPic] = useState(undefined);
  const [showUploadPane, setShowUploadPane] = useState(false);
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

  const toggleShowUploadPic = async () => {
    setShowUploadPane(!showUploadPane);
  };

  React.useEffect(() => {
    if (pic === undefined) setPic(props.user.pic);
  }, [pic, props.user.pic]);

  React.useEffect(() => {
    if (userId === undefined && props.isAdmin) setUserId(props.user.id);
  }, [props.user.id, props.isAdmin, userId]);

  const [finalMsg, setFinalMsg] = useState();

  return (
    <MyView>
      {showUploadPane && (
        <UploadFile
          accept={['image/*']}
          url={routes.setPic}
          expectedRes={'file'}
          finalMsg={finalMsg}
          token={props.token}
          setResult={async e => {
            if (e != null) {
              await setCacheItem('user', undefined);
              await fetchUser(props.token, user => {});
              setFinalMsg('عملیات موردنظر با موفقیت انجام شد');
            }
          }}
          multi={false}
          maxFileSize={1}
          toggleShow={() => setShowUploadPane(false)}
        />
      )}
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

      <MyView
        style={{
          ...styles.marginAuto,
          ...styles.alignItemsCenter,
          ...styles.gap10,
          ...styles.marginTop10,
        }}>
        <PhoneView>
          {props.accesses.indexOf('student') === -1 && !props.isAdmin && (
            <CommonButton
              theme={'dark'}
              onPress={() => toggleShowUploadPic()}
              title={'بارگذاری تصویر دلخواه'}
              style={{justifyContent: 'center'}}
            />
          )}

          <CommonButton
            theme={'dark'}
            onPress={() => toggleShowChooseAvatar()}
            title={translator.chooseAvatar}
            style={{justifyContent: 'center'}}
          />
        </PhoneView>
        <EqualTwoTextInputs>
          <SimpleText text={'کد معرفی شما:   '} />
          <SimpleText text={props.user.invitationCode} />
        </EqualTwoTextInputs>

        {props.userLevel && (
          <MyView style={{width: '80%'}}>
            <SimpleText
              style={{marginBottom: '40px'}}
              text={'سطح فعلی شما: ' + props.userLevel.name}
            />
            <Slider
              max={props.userLevel.maxPoint}
              min={props.userLevel.minPoint}
              value={props.userLevel.point}
              valueLabelDisplay={'on'}
              color="secondary"
              marks={[
                {
                  value: props.userLevel.minPoint,
                  label: props.userLevel.minPoint,
                },
                {
                  value: props.userLevel.maxPoint,
                  label: props.userLevel.maxPoint,
                },
              ]}
            />
            <a
              href="https://www.irysc.com/%d8%b1%d8%a7%d9%87%d9%86%d9%85%d8%a7%db%8c-%da%af%da%86-%d8%b3%d9%81%db%8c%d8%af-%d8%a2%db%8c%d8%b1%db%8c%d8%b3%da%a9/%d8%a7%d9%85%d8%aa%db%8c%d8%a7%d8%b2-%d9%85%d8%af%d8%a7%d9%84-%da%af%da%86-%d8%b3%d9%81%db%8c%d8%af/"
              style={{textAlign: 'center', fontFamily: 'IRANSans'}}>
              برای مشاهده امتیاز هر فعالیت اینجا رو کلیک کن
            </a>
          </MyView>
        )}

        <CommonButton
          onPress={() => props.navigate('/upgrade')}
          title={'درخواست ارتفا سطح'}
        />
      </MyView>
    </MyView>
  );
};
export default UpdatePic;
