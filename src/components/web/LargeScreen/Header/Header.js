import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {PhoneView, SimpleText} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {style} from './style';
import {faAngleDown, faBell} from '@fortawesome/free-solid-svg-icons';
import {getDevice} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';
import {logout} from '../../../../API/User';

const Header = props => {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const isApp = device.indexOf(Device.App) !== -1;

  const [showProfilePane, setShowProfilePane] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [pic, setPic] = useState(undefined);

  const changeShow = newStatus => {
    setShowProfilePane(newStatus);
  };

  const callLogout = async () => {
    props.setLoading(true);
    await logout(props.token, props.navigate);
    props.setUser(undefined);
    props.setLoading(false);
  };

  const changeShowNotif = newStatus => {
    setShowNotif(newStatus);
  };

  React.useEffect(() => {
    setPic(props.pic);
  }, [props.pic]);

  if (isLargePage || !props.hideRightMenu) {
    return (
      <PhoneView
        style={
          isLargePage
            ? {...style.Header, ...style.HeaderJustLarge}
            : isApp
            ? {
                ...style.Header,
                ...style.HeaderJustPhone,
                ...style.HeaderJustApp,
              }
            : {
                ...style.Header,
                ...style.HeaderJustPhone,
                ...style.HeaderJustWebPhone,
              }
        }>
        <PhoneView
          style={
            isLargePage
              ? {...style.Header_Profile, ...style.Header_Profile_Large}
              : {...style.Header_Profile, ...style.Header_Profile_Phone}
          }>
          {pic !== undefined && (
            <Image
              resizeMode="contain"
              style={
                isApp
                  ? {
                      ...style.Header_Profile_Image,
                      ...style.Header_Profile_Image_App,
                    }
                  : {
                      ...style.Header_Profile_Image,
                      ...style.Header_Profile_Image_Web,
                    }
              }
              source={{uri: pic}}
            />
          )}
          <SimpleText
            style={
              isApp
                ? {
                    ...style.Header_Profile_Text,
                    ...style.Header_Profile_Text_App,
                  }
                : {
                    ...style.Header_Profile_Text,
                    ...style.Header_Profile_Text_Web,
                  }
            }
            text={'سلام - ' + props.name}
          />
          <View style={{width: 30, height: 30, marginTop: 5, marginRight: 5}}>
            <SimpleFontIcon
              style={{}}
              onPress={() => changeShow(!showProfilePane)}
              icon={faAngleDown}
            />
          </View>

          {showProfilePane && (
            <View style={style.Header_Profile_MENU}>
              <TouchableOpacity onPress={() => callLogout()}>
                <SimpleText text="خروج" />
              </TouchableOpacity>
            </View>
          )}
        </PhoneView>

        <View style={style.Header_NOTIF}>
          <SimpleFontIcon
            onPress={() => changeShowNotif(!showNotif)}
            icon={faBell}
          />

          {showNotif && <View style={style.Header_Profile_MENU}></View>}
        </View>
      </PhoneView>
    );
  }

  return <></>;
};
export default Header;
