import {TouchableOpacity} from 'react-native';
import {getWidthHeight} from '../../../../services/Utility';
import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import vars from '../../../../styles/root';

export const style = {
  LogoJustLarge: {
    width: vars.RIGHT_MENU_WIDTH,
    marginRight: 5,
  },
  LogoJustPhone: {
    width: '100%',
  },
  Logo: {
    backgroundColor: vars.WHITE,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    boxShadow: '0px 3px 6px #00000029',
    height: 60,
    justifyContent: 'center',
  },
  LogoImageJustPhone: {
    width: 300,
  },
  LogoImageJustLarge: {
    width: 'calc(100% - 30px)',
  },
  LogoImage: {
    height: '90%',
    marginRight: -20,
  },
  HeaderJustWebPhone: {
    position: 'fixed',
  },
  HeaderJustApp: {
    position: 'absolute',
  },
  HeaderJustPhone: {
    width: '100%',
    left: 0,
    zIndex: 2,
    bottom: 0,
  },
  HeaderJustLarge: {
    width: 'calc(100% - ' + vars.RIGHT_MENU_WIDTH + 'px - 30px)',
    marginLeft: 10,
    marginRight: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Header: {
    backgroundImage: 'linear-gradient(to left, #FFAA00, #FF6600)',
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'red',
    height: 60,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  // Header_Profile_Phone: {
  //   marginRight: 40,
  // },
  // Header_Profile_Large: {
  //   marginRight: 40,
  // },
  Header_Profile: {
    marginTop: 10,
    backgroundColor: vars.WHITE,
    height: 40,
    zIndex: 2,
    alignItems: 'center',
  },
  Header_Profile_Image_App: {
    left: -10,
  },
  Header_Profile_Image_Web: {
    right: 0,
  },
  Header_Profile_Image: {
    width: 50,
    height: 50,
    position: 'absolute',
    marginTop: -5,
    borderRadius: '50%',
    backgroundColor: '#ff660050',
    zIndex: 5,
  },
  Header_Profile_Text_App: {
    marginRight: 0,
  },
  Header_Profile_Text_Web: {
    marginRight: 0,
  },
  Header_Profile_Text: {
    marginTop: 9,
  },
  Header_Profile_MENU: {
    width: '100%',
    height: 120,
    overflow: 'auto',
    backgroundColor: vars.WHITE,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    boxShadow: '0px 3px 6px #00000029',
    minWidth: 140,
    zIndex: 0,
    padding: 10,
    // marginTop: 40,
    alignItems: 'center',
  },
  Header_Profile_Notif: {
    width: '100%',
    height: 120,
    overflow: 'auto',
    backgroundColor: vars.WHITE,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    boxShadow: '0px 3px 6px #00000029',
    minWidth: 140,
    left: 100,
    zIndex: 0,
    padding: 10,
    marginTop: 0,
    alignItems: 'center',
  },
  Header_NOTIF: {
    backgroundColor: vars.WHITE,
    boxShadow: '0px 3px 6px #00000029',
    width: 40,
    height: 40,
    marginTop: 10,
  },
  MenuJustLarge: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: vars.RIGHT_MENU_WIDTH,
    height: 'calc(100vh - 60px - 10px)',
  },
  MenuJustPhone: {
    width: '98%',
    height: getWidthHeight()[1] - 70,
  },
  Menu: {
    marginTop: 10,
    paddingTop: 20,
    backgroundColor: vars.WHITE,
    boxShadow: '0px 3px 6px #00000029',
  },
  MenuItem: {
    cursor: 'pointer',
    borderBottomWidth: 1,
    borderBottomColor: vars.LIGHT_SILVER,
    borderBottomStyle: 'solid',
    justifyContent: 'space-between',
  },
  MenuItemSelected: {
    backgroundColor: vars.YELLOW,
  },
  MenuItemFontContainer: {
    backgroundColor: vars.LIGHT_SILVER,
    width: 40,
    height: 40,
  },
  MenuItemFontContainerSelected: {
    backgroundColor: vars.YELLOW,
  },
};

export const MenuItem = props => {
  return (
    <div
      onClick={props.onClick}
      className={
        props.selected !== undefined && props.selected
          ? 'menu-item menu-item-selected'
          : 'menu-item'
      }>
      <SimpleText
        style={{
          padding: 3,
          paddingRight: 12,
          color:
            props.selected !== undefined && props.selected
              ? vars.WHITE
              : vars.LIGHT_SILVER,
        }}
        text={props.text}
      />
      {props.icon !== undefined && (
        <div
          className={
            props.selected !== undefined && props.selected
              ? 'menu-item-font-container menu-item-font-container-selected'
              : 'menu-item-font-container'
          }>
          <SimpleFontIcon style={{color: vars.WHITE}} icon={props.icon} />
        </div>
      )}
    </div>
  );
};

export const MenuItemPhone = props => {
  let styles = {...style.MenuItem, ...{marginTop: 10}};
  if (props.selected !== undefined && props.selected)
    styles = {...styles, ...style.MenuItemSelected};
  return (
    <TouchableOpacity onPress={props.onClick}>
      <PhoneView style={styles}>
        <SimpleText
          style={{
            padding: 3,
            paddingRight: 12,
            color:
              props.selected !== undefined && props.selected
                ? vars.WHITE
                : vars.LIGHT_SILVER,
          }}
          text={props.text}
        />
        <MyView
          style={
            props.selected !== undefined && props.selected
              ? [
                  {
                    ...style.MenuItemFontContainer,
                    ...style.MenuItemFontContainerSelected,
                  },
                ]
              : style.MenuItemFontContainer
          }>
          <SimpleFontIcon style={{color: vars.WHITE}} icon={props.icon} />
        </MyView>
      </PhoneView>
    </TouchableOpacity>
  );
};
