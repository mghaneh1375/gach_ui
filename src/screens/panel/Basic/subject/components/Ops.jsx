import React from 'react';
import {CommonButton, PhoneView, MyView} from '@/styles';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import commonTranslator from '@/translator/common';
import {removeSubject} from '../../utility';
function Ops(props) {
  return (
    <MyView>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView>
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
