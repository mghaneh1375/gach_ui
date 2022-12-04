import React from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../translator/Common';
import {CommonButton, PhoneView, MyView} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import {styles} from '../../../../styles/Common/Styles';

const UpdateUsername = props => {
  const changePhone = () => {
    props.setMode('sms');
    props.toggleModal();
  };
  const changeMail = () => {
    props.setMode('mail');
    props.toggleModal();
  };

  return (
    <MyView>
      <PhoneView style={{...styles.alignItemsStart}}>
        <JustBottomBorderTextInput
          value={props.phone}
          isHalf={props.isInPhone ? undefined : true}
          disable={true}
          placeholder={commonTranslator.phone}
          subText={commonTranslator.phone}
        />
        <PhoneView style={{marginTop: 0}}>
          <CommonButton
            style={{
              backgroundColor: vars.DARK_BLUE,
            }}
            padding={'5px 50px'}
            title={commonTranslator.change}
            onPress={() => changePhone()}
          />
        </PhoneView>
      </PhoneView>
      <PhoneView style={{...styles.alignItemsStart}}>
        <JustBottomBorderTextInput
          isHalf={props.isInPhone ? undefined : true}
          value={props.mail}
          disable={true}
          placeholder={commonTranslator.mail}
          subText={commonTranslator.mail}
        />
        <PhoneView style={{...styles.alignItemsStart}}>
          <CommonButton
            style={{
              backgroundColor: vars.DARK_BLUE,
              paddingLeft: '50px !important',
              paddingRight: '50px !important',
            }}
            padding={'5px 50px'}
            title={commonTranslator.change}
            onPress={() => changeMail()}
          />
        </PhoneView>
      </PhoneView>
    </MyView>
  );
};
export default UpdateUsername;
