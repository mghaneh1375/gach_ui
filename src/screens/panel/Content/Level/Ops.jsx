import {CommonButton, MyView, PhoneView} from '@/styles';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import commonTranslator from '@/translator/common';
function Ops(props) {
  return (
    <>
      <MyView>
        <LargePopUp
          title={commonTranslator.opMenu}
          toggleShowPopUp={props.toggleShowPopUp}>
          <PhoneView>
            <CommonButton
              title={commonTranslator.edit}
              onPress={() => {
                props.setSelectedLevel();
                props.setMode('edit');
              }}
              theme={'transparent'}
            />
          </PhoneView>
        </LargePopUp>
      </MyView>
    </>
  );
}
export default Ops;
