import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import ConfirmationBatchOpPane from '../../../../../components/web/ConfirmationBatchOpPane';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton, PhoneView, MyView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../translator/Common';
import {dispatchSchoolContext, schoolContext} from './Context';

function Ops(props) {
  const useGlobalState = () => [
    React.useContext(schoolContext),
    React.useContext(dispatchSchoolContext),
  ];

  const [state, dispatch] = useGlobalState();

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

    if (res.doneIds.indexOf(state.selectedSchool.id) !== -1) {
      let allItems = state.schools;
      allItems = allItems.filter(elem => state.selectedSchool.id !== elem.id);
      dispatch({schools: allItems, data: allItems});
    }

    props.setMode('list');
    props.toggleShowPopUp();
  };

  return (
    <MyView>
      {showRemovePane && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          url={routes.removeSchools}
          expected={['excepts', 'doneIds']}
          data={{items: [state.selectedSchool.id]}}
          afterFunc={afterRemove}
          toggleShowPopUp={toggleShowRemovePane}
        />
      )}
      {!showRemovePane && (
        <LargePopUp
          title={commonTranslator.opMenu}
          toggleShowPopUp={props.toggleShowPopUp}>
          <PhoneView>
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
