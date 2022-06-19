import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {SimpleText} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import style from './style';
import {faAngleDown, faBell} from '@fortawesome/free-solid-svg-icons';

const Header = props => {
  const [show, setShow] = useState(false);

  const changeShow = newStatus => {
    setShow(newStatus);
  };

  return (
    <View style={style.Header}>
      <View style={style.Header_Profile}>
        <Image style={style.Header_Profile_Image} source={props.pic} />
        <SimpleText
          style={{marginTop: 10, marginRight: 10}}
          text={'سلام - ' + props.name}
        />
        <View style={{width: 30, height: 30, marginTop: 5, marginRight: 5}}>
          <SimpleFontIcon
            style={{}}
            onPress={() => changeShow(!show)}
            icon={faAngleDown}
          />
        </View>

        {show && <View style={style.Header_Profile_MENU}></View>}
      </View>

      <View style={style.Header_NOTIF}>
        <SimpleFontIcon onPress={() => changeShow(!show)} icon={faBell} />
      </View>
    </View>
  );
};
export default Header;
