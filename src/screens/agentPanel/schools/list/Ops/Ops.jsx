import {useState} from 'react';
import ConfirmationBatchOpPane from '@/components/web/ConfirmationBatchOpPane.jsx';
import {showSuccess} from '@/services/utility';
import {CommonButton, MyView, PhoneView} from '@/styles';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import commonTranslator from '@/translator/common';
import {login} from '../../../../panel/users/components/utility';
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
            items: [props.selectedId],
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
            {props.isAdmin && (
              <>
                <CommonButton
                  title={commonTranslator.seeInfo}
                  onPress={() => window.open('/profile/' + props.selectedId)}
                  theme={'transparent'}
                />
                <CommonButton
                  theme={'transparent'}
                  onPress={() => props.setMode('chargeAccount')}
                  title={'شارژ حساب'}
                />
              </>
            )}
            {props.isAdmin && (
              <CommonButton
                title={commonTranslator.entrance}
                onPress={async () => {
                  const res = await login(
                    props.setLoading,
                    props.token,
                    props.selectedId,
                  );
                  if (res) {
                    props.toggleShowPopUp();
                    window.location.href = '/';
                  }
                }}
                theme={'transparent'}
              />
            )}

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
