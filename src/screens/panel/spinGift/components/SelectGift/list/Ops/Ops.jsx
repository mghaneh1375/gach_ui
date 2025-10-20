import {PhoneView, MyView} from '@/styles';
import {LargePopUp} from '../../../../../../../styles/common/PopUp.jsx';
import commonTranslator from '../../../../../../../translator/common.js';
import {CommonButton} from '../../../../../../../styles/CommonComponents.jsx';
import {showSuccess} from '../../../../../../../services/utility';
import {useState} from 'react';
import {routes} from '../../../../../../../api/apiRoutes';
import ConfirmationBatchOpPane from '../../../../../../../components/web/ConfirmationBatchOpPane.jsx';
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
          url={routes.removeGift}
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
          </PhoneView>
        </LargePopUp>
      )}
    </MyView>
  );
}
export default Ops;
