import React from 'react';
import {CommonButton, PhoneView, MyView} from '@/styles';
import {LargePopUp} from '../../../../styles/common/PopUp';
import commonTranslator from '@/translator/common';
import {removeGrade} from '../utility';
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
