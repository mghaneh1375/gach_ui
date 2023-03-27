import vars from '../root';

export const NavContainerStyle = {
  width: '100%',
  height: '50px',
  bottom: 0,
  flexDirection: vars.flexDirectionRev,
  alignContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  backgroundColor: '#FFFFFFE6',
};

export const NavItemContainerStyle = {
  justifyContent: 'center',
  width: 70,
  height: 70,
  alignContent: 'center',
  alignItems: 'center',
  top: -20,
};

export const NavItemStyle = {
  width: 50,
  height: 50,
  display: 'flex',
  shadowColor: 'black',
  shadowOpacity: 0.8,
  shadowOffset: {width: 0, height: 10},
  shadowRadius: 10,
  elevation: 10,
  borderRadius: '50%',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 1.0)',
  alignContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 3px 6px #818181a8',
};

export const NavItemImageStyle = {
  justifyContent: 'center',
  width: '25px',
};

export const NavTextStyle = {
  fontSize: '12px',
  fontFamily: 'IRANSans',
  color: '#707070',
};

export const TinyNavTextStyle = {
  fontSize: '9px',
  fontFamily: 'IRANSans',
  textAlign: 'center',
  marginTop: '3px',
  fontWeight: 'bold',
  color: '#707070',
};
