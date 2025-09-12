import React, {useState} from 'react';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane.jsx';
import {showSuccess} from '@/services/utility';
import {CommonButton, PhoneView, MyView} from '@/styles';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import commonTranslator from '@/translator/common';
import Translate from '../translate';
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
            {!props.isAdvisor && (
              <>
                <CommonButton
                  theme={'transparent'}
                  title={commonTranslator.view + ' ' + Translate.info}
                  onPress={() => window.open('/profile/' + props.selectedId)}
                />
                <CommonButton
                  theme={'transparent'}
                  onPress={() => props.setMode('changePass')}
                  title={commonTranslator.changePassword}
                />
              </>
            )}
            {props.isAdvisor && (
              <CommonButton
                theme={'transparent'}
                title={'ورود به پنل مشاوره'}
                onPress={() => props.setMode('advisorPanel')}
              />
            )}
            <CommonButton
              theme={'transparent'}
              title={commonTranslator.educationalHistory}
              onPress={() =>
                window.open('/studentEducationalHistory/' + props.selectedId)
              }
            />
          </PhoneView>
        </LargePopUp>
      )}
    </MyView>
  );
}
export default Ops;
