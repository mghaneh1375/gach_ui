import React from 'react';
import {View} from 'react-native';
import {CommonButton, PhoneView, MyView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../tranlates/Common';
import {removeSubject} from '../../Utility';

function Ops(props) {
  return (
    <MyView style={{zIndex: 10}}>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView style={{flexWrap: 'wrap'}}>
          <CommonButton
            onPress={() =>
              removeSubject(
                props.setLoading,
                props.token,
                props.subject.id,
                props.afterDelete,
              )
            }
            dir={'rtl'}
            theme={'transparent'}
            title={commonTranslator.delete}
          />
          <CommonButton
            dir={'rtl'}
            theme={'transparent'}
            onPress={() => props.changeMode('edit')}
            title={commonTranslator.edit}
          />
        </PhoneView>
      </LargePopUp>
    </MyView>
  );
}

export default Ops;
