import React from 'react';
import {View} from 'react-native';
import {CommonButton, PhoneView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../tranlates/Common';
import {login, toggleStatus} from './Utility';

function Ops(props) {
  return (
    <MyView style={{zIndex: 10}}>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView style={{flexWrap: 'wrap'}}>
          <CommonButton
            title={commonTranslator.seeInfo}
            onPress={() => window.open('/profile/' + props.user.id)}
            theme={'transparent'}
          />
          <CommonButton
            title={commonTranslator.entrance}
            onPress={async () => {
              let res = await login(
                props.setLoading,
                props.token,
                props.user.id,
              );
              if (res) {
                props.toggleShowPopUp();
                window.location.href = '/';
              }
            }}
            theme={'transparent'}
          />
          <CommonButton
            onPress={() => props.changeMode('changeLevel')}
            theme={'transparent'}
            title={commonTranslator.changeLevel}
          />
          <CommonButton
            onPress={() => {
              toggleStatus(
                props.setLoading,
                props.token,
                props.user.id,
                res => {
                  if (res !== null) {
                    props.user.status = res;
                    props.toggleShowPopUp();
                  }
                },
              );
            }}
            theme={'transparent'}
            title={commonTranslator.changeStatus}
          />
          <CommonButton
            theme={'transparent'}
            onPress={() => props.changeMode('changePass')}
            title={commonTranslator.changePassword}
          />
        </PhoneView>
      </LargePopUp>
    </MyView>
  );
}

export default Ops;
