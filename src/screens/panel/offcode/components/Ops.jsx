import {useState} from 'react';
import {CommonButton, PhoneView, MyView, SimpleText} from '@/styles';
import {LargePopUp} from '../../../../styles/common/PopUp';
import commonTranslator from '@/translator/common';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {routes} from '@/api/apiRoutes';
import {showSuccess} from '../../../../services/utility';
const Ops = props => {
  const [showRemovePane, setShowRemovePane] = useState(false);
  const toggleShowRemovePane = () => {
    setShowRemovePane(!showRemovePane);
  };
  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess(res.excepts);
    if (res.doneIds.indexOf(props.off.id) !== -1)
      props.removeOffs([props.off.id]);
    props.setMode('list');
    props.toggleShowPopUp();
  };
  return (
    <MyView>
      {showRemovePane && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          url={routes.removeOffs}
          expected={['excepts', 'doneIds']}
          data={{
            items: [props.off.id],
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
            {!props.off.used && (
              <CommonButton
                onPress={() => props.setMode('update')}
                dir={'rtl'}
                theme={'transparent'}
                title={commonTranslator.edit}
              />
            )}
            {!props.off.used && (
              <CommonButton
                dir={'rtl'}
                onPress={() => toggleShowRemovePane()}
                theme={'transparent'}
                title={commonTranslator.delete}
              />
            )}
            {props.off.used && (
              <SimpleText
                text={'این کد استفاده شده است و عملیاتی وجود ندارد'}
              />
            )}
          </PhoneView>
        </LargePopUp>
      )}
    </MyView>
  );
};
export default Ops;
