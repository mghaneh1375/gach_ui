import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {showSuccess} from '../../../../services/Utility';
import {CommonButton, PhoneView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../tranlates/Common';

function Ops(props) {
  const changeMode = newMode => {
    props.setMode(newMode);
  };
  return (
    <View style={{zIndex: 10}}>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView style={{flexWrap: 'wrap'}}>
          <CommonButton
            dir={'rtl'}
            theme={'transparent'}
            title={commonTranslator.changeLevel}
          />
          <CommonButton
            dir={'rtl'}
            theme={'transparent'}
            title={commonTranslator.changeStatus}
          />
          <CommonButton
            dir={'rtl'}
            theme={'transparent'}
            onPress={() => props.changeMode('changePass')}
            title={commonTranslator.changePassword}
          />
        </PhoneView>
      </LargePopUp>
    </View>
  );
}

export default Ops;
