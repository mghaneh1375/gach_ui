import {CommonButton, MyView, PhoneView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../translator/Common';

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
