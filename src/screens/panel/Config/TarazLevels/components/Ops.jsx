import {CommonButton, PhoneView} from '@/styles';
import {LargePopUp} from '../../../../../styles/common/PopUp';
import commonTranslator from '@/translator/common';
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
