import {useState} from 'react';
import {View} from 'react-native';
import ConfirmationBatchOpPane from '../../../../../components/web/ConfirmationBatchOpPane';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton, MyView, PhoneView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../translator/Common';
import {login} from '../../../../panel/users/components/Utility';
import Translate from '../../Translate';

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
          data={{items: [props.selectedId]}}
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
              <CommonButton
                title={commonTranslator.seeInfo}
                onPress={() => window.open('/profile/' + props.selectedId)}
                theme={'transparent'}
              />
            )}
            {props.isAdmin && (
              <CommonButton
                title={commonTranslator.entrance}
                onPress={async () => {
                  let res = await login(
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
