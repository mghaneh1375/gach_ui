import {useState} from 'react';
import {
  CommonButton,
  PhoneView,
  MyView,
  SimpleText,
} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../translator/Common';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';

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
          data={{items: [props.off.id]}}
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
