import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import ConfirmationBatchOpPane from '@/components/web/ConfirmationBatchOpPane.jsx';
import {showSuccess} from '@/services/utility.js';
import {CommonButton, PhoneView, MyView} from '@/styles';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import commonTranslator from '@/translator/common.js';
import {dispatchSchoolContext, schoolContext} from './Context.jsx';
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
      dispatch({
        schools: allItems,
        data: allItems,
      });
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
          data={{
            items: [state.selectedSchool.id],
          }}
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
