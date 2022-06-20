import {StyleSheet, View} from 'react-native';
import {SimpleText} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import vars from '../../../../styles/root';
import {Pressable} from 'react-native-web-hover';

export const style = {
  Logo: {
    backgroundColor: vars.WHITE,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    boxShadow: '0px 3px 6px #00000029',
    width: 200,
    height: 60,
    marginRight: 5,
    flexDirection: 'row',
  },
  Header: {
    backgroundImage: 'linear-gradient(to left, #FFAA00, #FF6600)',
    height: 60,
    width: 'calc(100% - 230px)',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
  },
  Header_Profile: {
    flexDirection: 'row',
    marginRight: 80,
    marginTop: 10,
    backgroundColor: vars.WHITE,
    paddingLeft: 10,
    height: 40,
  },
  Header_Profile_Image: {
    width: 50,
    height: 50,
    marginRight: -40,
    marginTop: -5,
    borderRadius: '50%',
  },
  Header_Profile_MENU: {
    width: '100%',
    position: 'absolute',
    top: 45,
    height: 200,
    overflow: 'auto',
    backgroundColor: vars.WHITE,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    boxShadow: '0px 3px 6px #00000029',
    minWidth: '140px',
    left: 0,
  },
  Header_NOTIF: {
    backgroundColor: vars.WHITE,
    boxShadow: '0px 3px 6px #00000029',
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 'auto',
  },
  Menu: {
    height: 'calc(100vh - 60px - 10px)',
    marginTop: 10,
    paddingTop: 20,
    backgroundColor: vars.WHITE,
    boxShadow: '0px 3px 6px #00000029',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: 200,
  },
};

export const MenuItem = props => {
  return (
    <div
      className={
        props.selected !== undefined && props.selected
          ? 'menu-item menu-item-selected'
          : 'menu-item'
      }>
      <SimpleText
        style={{
          paddingTop: 10,
          paddingRight: 10,
          color:
            props.selected !== undefined && props.selected
              ? vars.WHITE
              : vars.LIGHT_SILVER,
        }}
        text={props.text}
      />
      <div
        className={
          props.selected !== undefined && props.selected
            ? 'menu-item-font-container menu-item-font-container-selected'
            : 'menu-item-font-container'
        }>
        <SimpleFontIcon style={{color: vars.WHITE}} icon={props.icon} />
      </div>
    </div>
  );
};
