"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basketBox = exports.styleTextDecorRed = exports.styleColorWhite = exports.styleGiftIcon = exports.styleGiftIconParent = exports.styleJustifyContentEnd = exports.stylePricaPane = exports.styleFontSize15 = exports.styleJustifyContentBetween = exports.styleFontSize11 = exports.styleTinyTextIcon = exports.styleFullItem = exports.styleItem = exports.styleItemsParent = exports.styleItemsGrandParent = exports.styleFontSize13 = exports.styleDigest = exports.styleCircleBox = exports.styleTitle = exports.styleYellowBox = exports.styleCard = void 0;

var _Utility = require("../../../../services/Utility");

var _root = _interopRequireDefault(require("../../../../styles/root"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var width = (0, _Utility.getWidthHeight)()[0];
var styleCard = {
  padding: 0,
  width: width > 768 ? 390 : 320,
  borderRadius: 10
};
exports.styleCard = styleCard;
var styleYellowBox = {
  width: 'calc(100% - 30px)',
  marginLeft: 15,
  marginRight: 15,
  backgroundColor: '#FFEFCE',
  alignSelf: 'center',
  marginBottom: 7,
  marginTop: 25,
  borderRadius: 5,
  height: 40,
  alignItems: 'center'
};
exports.styleYellowBox = styleYellowBox;
var styleTitle = {
  alignItems: 'center',
  alignSelf: 'start',
  paddingRight: 10,
  height: '100%',
  display: 'flex'
};
exports.styleTitle = styleTitle;
var styleCircleBox = {
  width: 60,
  color: 'white',
  height: 60,
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: 'orange',
  left: 26,
  top: -10,
  justifyContent: 'center',
  alignItems: 'center'
};
exports.styleCircleBox = styleCircleBox;
var styleDigest = {
  width: 'calc(100% - 30px)',
  marginRight: 20
};
exports.styleDigest = styleDigest;
var styleFontSize13 = {
  fontSize: 13
};
exports.styleFontSize13 = styleFontSize13;
var styleItemsGrandParent = {
  padding: 10,
  marginTop: 5
};
exports.styleItemsGrandParent = styleItemsGrandParent;
var styleItemsParent = {
  flexWrap: 'wrap',
  gap: 15
};
exports.styleItemsParent = styleItemsParent;
var styleItem = {
  width: 'calc(33% - 15px)',
  flexWrap: 'wrap'
};
exports.styleItem = styleItem;
var styleFullItem = {
  width: '100%'
};
exports.styleFullItem = styleFullItem;
var styleTinyTextIcon = {
  right: -22,
  top: 15,
  width: 20
};
exports.styleTinyTextIcon = styleTinyTextIcon;
var styleFontSize11 = {
  fontSize: 11
};
exports.styleFontSize11 = styleFontSize11;
var styleJustifyContentBetween = {
  justifyContent: 'space-around'
}; // export const styleJustifyContentBetween = {
//   justifyContent: 'space-around',
// };

exports.styleJustifyContentBetween = styleJustifyContentBetween;
var styleFontSize15 = {
  fontSize: 15,
  alignSelf: 'flex-start'
};
exports.styleFontSize15 = styleFontSize15;
var stylePricaPane = {
  marginTop: 30,
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingLeft: 10,
  paddingRight: 10
};
exports.stylePricaPane = stylePricaPane;
var styleJustifyContentEnd = {
  justifyContent: 'flex-end',
  width: '100%'
};
exports.styleJustifyContentEnd = styleJustifyContentEnd;
var styleGiftIconParent = {
  position: 'absolute',
  right: -15,
  top: -15
};
exports.styleGiftIconParent = styleGiftIconParent;
var styleGiftIcon = {
  color: _root["default"].ORANGE_RED,
  width: 38,
  height: 38
};
exports.styleGiftIcon = styleGiftIcon;
var styleColorWhite = {
  color: 'white'
};
exports.styleColorWhite = styleColorWhite;
var styleTextDecorRed = {
  textDecoration: 'line-through',
  textDecorationColor: 'red'
};
exports.styleTextDecorRed = styleTextDecorRed;
var basketBox = {
  position: 'fixed',
  bottom: 0,
  left: 20,
  height: 100,
  justifyContent: 'flex-end',
  paddingBottom: 0
};
exports.basketBox = basketBox;