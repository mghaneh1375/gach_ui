import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import ConfirmationBatchOpPane from '../../../../../components/web/ConfirmationBatchOpPane';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton, MyView, PhoneView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../translator/Common';
import certTranslator from '../../Translator';

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
          data={{items: [props.id]}}
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
