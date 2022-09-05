import React from 'react';
import {View} from 'react-native';
import {CommonButton, PhoneView, MyView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../translator/Common';
import {removeGrade} from '../Utility';

function Ops(props) {
  return (
    <MyView>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView>
          <CommonButton
            onPress={() =>
              removeGrade(
                props.setLoading,
                props.token,
                props.grade.id,
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
            onPress={() => props.setMode('edit')}
            title={commonTranslator.edit}
          />
        </PhoneView>
      </LargePopUp>
    </MyView>
  );
}

export default Ops;
