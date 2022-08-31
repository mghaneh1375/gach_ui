import {CommonButton, PhoneView} from '../../../../../../styles/Common';
import {LargePopUp} from '../../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../../translator/Common';
import {resetStudentQuizEntryTime} from '../../Utility';
import translator from '../List/Translator';

function Ops(props) {
  return (
    <LargePopUp
      header={commonTranslator.op}
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView>
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res = await resetStudentQuizEntryTime(
              props.quizId,
              props.quizMode,
              props.selectedUserId,
              props.token,
            );
            props.setLoading(false);
            if (res !== null) {
              props.resetTime();
            }
          }}
          theme={'transparent'}
          title={translator.resetTime}
        />
      </PhoneView>
    </LargePopUp>
  );
}

export default Ops;
