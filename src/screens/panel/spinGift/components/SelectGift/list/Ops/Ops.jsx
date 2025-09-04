import {PhoneView, MyView} from '../../../../../../../styles/Common';
import {LargePopUp} from '../../../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../../../translator/Common';
import {CommonButton} from '../../../../../../../styles/Common';
import {showSuccess} from '../../../../../../../services/Utility';
import {useState} from 'react';
import {routes} from '../../../../../../../API/APIRoutes';
import ConfirmationBatchOpPane from '../../../../../../../components/web/ConfirmationBatchOpPane';

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
          </PhoneView>
        </LargePopUp>
      )}
    </MyView>
  );
}

export default Ops;
