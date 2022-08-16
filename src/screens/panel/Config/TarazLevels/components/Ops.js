import {CommonButton, PhoneView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../tranlates/Common';

function Ops(props) {
  return (
    <LargePopUp
      title={commonTranslator.opMenu}
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView>
        <CommonButton
          onPress={() => props.setMode('update')}
          dir={'rtl'}
          theme={'transparent'}
          title={commonTranslator.edit}
        />
      </PhoneView>
    </LargePopUp>
  );
}

export default Ops;
