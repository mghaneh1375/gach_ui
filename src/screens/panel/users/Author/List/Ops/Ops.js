import {CommonButton, PhoneView, MyView} from '../../../../../../styles/Common';
import {LargePopUp} from '../../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../../tranlates/Common';
import Translate from '../../Translator';

//import {login, toggleStatus} from './Utility';

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
          <CommonButton theme={'transparent'} title={commonTranslator.delete} />
        </PhoneView>
      </LargePopUp>
    </MyView>
  );
}

export default Ops;
