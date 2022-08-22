import {getWidthHeight} from '../../../../services/Utility';
import vars from '../../../../styles/root';

const width = getWidthHeight()[0];

export const styleCard = {
  padding: 0,
  width: width > 768 ? 390 : 320,
  boxShadow: '0px 3px 16px 4px rgb(0 0 0 / 16%)',
  borderRadius: 10,
};

export const styleCommonWebBoxView = {
  width: 'calc(100% - 30px)',
  marginLeft: 15,
  marginRight: 15,
  backgroundColor: '#FFEFCE',
  alignSelf: 'center',
  marginBottom: 7,
  marginTop: 25,
  borderRadius: 5,
  height: 40,
  alignItems: 'center',
};
export const styleTitle = {
  alignItems: 'center',
  alignSelf: 'start',
  paddingRight: 10,
  height: '100%',
  display: 'flex',
};
export const styleLittleView = {
  width: 60,
  color: 'white',
  height: 60,
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: 'orange',
  left: 26,
  top: -10,
  justifyContent: 'center',
  alignItems: 'center',
};
export const styleDigest = {
  width: 325,
  marginRight: 20,
};
export const styleFontSize13 = {fontSize: 13};

export const styleItemsGrandParent = {
  padding: 10,
  marginTop: 5,
};
export const styleItemsParent = {
  flexWrap: 'wrap',
  gap: 15,
};
export const styleItem = {
  width: 'calc(33% - 15px)',
  flexWrap: 'wrap',
};
export const styleFullItem = {
  width: '100%',
};

export const styleTinyTextIcon = {
  right: -22,
  top: 15,
  width: 20,
};
export const styleFontSize11 = {
  fontSize: 11,
};
export const styleJustifyContentBetween = {
  justifyContent: 'space-around',
};
// export const styleJustifyContentBetween = {
//   justifyContent: 'space-around',
// };
export const styleFontSize15 = {
  fontSize: 15,
  alignSelf: 'flex-start',
};
export const stylePricaPane = {
  marginTop: 30,
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingLeft: 10,
  paddingRight: 10,
};
export const styleJustifyContentEnd = {
  justifyContent: 'flex-end',
  width: '100%',
};
export const styleGiftIconParent = {
  position: 'absolute',
  right: -15,
  top: -15,
};
export const styleGiftIcon = {
  color: vars.ORANGE_RED,
  width: 38,
  height: 38,
};
export const styleColorWhite = {
  color: 'white',
};
export const styleTextDecorRed = {
  textDecoration: 'line-through',
  textDecorationColor: 'red',
};

export const basketBox = {
  position: 'fixed',
  bottom: 0,
  left: 20,
  height: 100,
  justifyContent: 'flex-end',
  paddingBottom: 0,
};
