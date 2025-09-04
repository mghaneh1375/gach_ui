import {CommonButton, PhoneView} from '@/styles';
import {LargePopUp} from '../../../../styles/common/PopUp.jsx';
import commonTranslator from '@/translator/common';
function Ops(props) {
  return (
    <LargePopUp
      title={commonTranslator.opMenu}
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView>
        <CommonButton
          dir={'rtl'}
          onPress={() => props.setMode('detail')}
          theme={'transparent'}
          title={commonTranslator.seeInfo}
        />
      </PhoneView>
    </LargePopUp>
  );
}
export default Ops;
