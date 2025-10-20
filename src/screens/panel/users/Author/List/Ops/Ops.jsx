import {CommonButton, PhoneView, MyView} from '@/styles';
import {LargePopUp} from '../../../../../../styles/common/PopUp.jsx';
import commonTranslator from '../../../../../../translator/common.js';
import Translate from '../../translator';
import {removeAuthor} from '../utility';

//import {login, toggleStatus} from './Utility.jsx';

function Ops(props) {
  return (
    <MyView>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView>
          <CommonButton
            theme={'transparent'}
            title={Translate.showTransaction}
            onPress={() => props.setMode('show')}
          />
          <CommonButton
            onPress={() => props.setMode('editAuthor')}
            title={commonTranslator.edit}
            theme={'transparent'}
          />
          <CommonButton
            theme={'transparent'}
            title={commonTranslator.delete}
            onPress={() => {
              removeAuthor(
                props.setLoading,
                props.token,
                props.authorId,
                props.afterDelete,
              );
            }}
          />
        </PhoneView>
      </LargePopUp>
    </MyView>
  );
}
export default Ops;
