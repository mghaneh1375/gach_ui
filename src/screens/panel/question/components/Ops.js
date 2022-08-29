import {CommonButton, PhoneView, MyView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../translator/Common';

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
