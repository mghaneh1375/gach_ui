import React, {useState} from 'react';
import ConfirmationBatchOpPane from '@/components/web/ConfirmationBatchOpPane.jsx';
import {showSuccess} from '@/services/utility';
import {CommonButton, PhoneView, MyView} from '@/styles';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import commonTranslator from '@/translator/common';
import Translate from '../../translate';
function Ops(props) {
  const [showRemovePane, setShowRemovePane] = useState(false);
  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess();
    props.remove(res.doneIds);
    props.setMode('list');
    props.toggleShowPopUp();
  };
  const toggleShowRemovePane = () => {
    setShowRemovePane(!showRemovePane);
  };
  return (
    <MyView>
      {showRemovePane && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          //   url={routes.}
          expected={['excepts', 'doneIds']}
          data={{
            items: [props.id],
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
              theme={'transparent'}
              title={commonTranslator.view + ' ' + commonTranslator.students}
              onPress={() => props.setMode('students')}
            />
            <CommonButton
              theme={'transparent'}
              title={commonTranslator.view + ' ' + Translate.info}
              onPress={() => props.setMode('details')}
            />
            <CommonButton
              onPress={() => props.setMode('edit')}
              title={commonTranslator.edit}
              theme={'transparent'}
            />
            <CommonButton
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
