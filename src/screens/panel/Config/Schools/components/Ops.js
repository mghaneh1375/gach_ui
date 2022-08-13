import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../../API/APIRoutes';
import ConfirmationBatchOpPane from '../../../../../components/web/ConfirmationBatchOpPane';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton, PhoneView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../tranlates/Common';

function Ops(props) {
  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const [showRemovePane, setShowRemovePane] = useState(false);

  const toggleShowRemovePane = () => {
    setShowRemovePane(!showRemovePane);
  };

  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess(res.excepts);

    if (res.doneIds.indexOf(props.school.id) !== -1)
      props.removeSchools([props.school.id]);

    props.setMode('list');
    props.toggleShowPopUp();
  };

  return (
    <MyView style={{zIndex: 10}}>
      {showRemovePane && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          url={routes.removeSchools}
          expected={['excepts', 'doneIds']}
          data={{items: [props.school.id]}}
          afterFunc={afterRemove}
          toggleShowPopUp={toggleShowRemovePane}
        />
      )}
      {!showRemovePane && (
        <LargePopUp
          title={commonTranslator.opMenu}
          toggleShowPopUp={props.toggleShowPopUp}>
          <PhoneView style={{flexWrap: 'wrap'}}>
            <CommonButton
              onPress={() => changeMode('update')}
              dir={'rtl'}
              theme={'transparent'}
              title={commonTranslator.edit}
            />
            <CommonButton
              dir={'rtl'}
              onPress={() => toggleShowRemovePane()}
              theme={'transparent'}
              title={commonTranslator.delete}
            />
          </PhoneView>
        </LargePopUp>
      )}
    </MyView>
  );
}

export default Ops;
