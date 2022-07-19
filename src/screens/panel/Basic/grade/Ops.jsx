import React from 'react';
import {View} from 'react-native';
import {removeItems} from '../../../../services/Utility';
import {CommonButton, PhoneView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../tranlates/Common';
import {removeGrade} from '../Utility';

function Ops(props) {
  return (
    <View style={{zIndex: 10}}>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView style={{flexWrap: 'wrap'}}>
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
            onPress={() => props.changeMode('edit')}
            title={commonTranslator.edit}
          />
        </PhoneView>
      </LargePopUp>
    </View>
  );
}

export default Ops;
