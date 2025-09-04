import React from 'react';
import {CommonButton, PhoneView, MyView} from '@/styles';
import {LargePopUp} from '../../../../styles/common/PopUp';
import commonTranslator from '@/translator/common';
import {removeLesson} from '../utility';
function Ops(props) {
  return (
    <MyView>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView>
          <CommonButton
            onPress={() =>
              removeLesson(
                props.setLoading,
                props.token,
                props.subMode,
                props.lesson.id,
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
