import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import ConfirmationBatchOpPane from '@/components/web/ConfirmationBatchOpPane';
import {showSuccess} from '@/services/utility';
import {CommonButton, MyView, PhoneView} from '@/styles';
import {LargePopUp} from '../../../../../styles/common/PopUp';
import commonTranslator from '@/translator/common';
import certTranslator from '../../translator';
function Ops(props) {
  const [showRemovePane, setShowRemovePane] = useState(false);
  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess(res.excepts);
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
          url={routes.removeCertificate}
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
              onPress={() => props.setMode('update')}
              title={commonTranslator.edit}
              theme={'transparent'}
            />
            <CommonButton
              onPress={() => props.setMode('addStudent')}
              theme={'transparent'}
              title={certTranslator.addStudent}
            />
            <CommonButton
              onPress={() => toggleShowRemovePane()}
              theme={'transparent'}
              title={commonTranslator.delete}
            />
            <CommonButton
              onPress={() => props.setMode('report')}
              theme={'transparent'}
              title={'لیست نفرات دریافت کننده'}
            />
          </PhoneView>
        </LargePopUp>
      )}
    </MyView>
  );
}
export default Ops;
