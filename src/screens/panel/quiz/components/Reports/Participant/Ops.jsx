import {CommonButton, PhoneView} from '@/styles';
import {LargePopUp} from '../../../../../../styles/common/PopUp.jsx';
import commonTranslator from '../../../../../../translator/common.js';
import {resetStudentQuizEntryTime} from '../../utility';
import translator from '../list/translator';
function Ops(props) {
  return (
    <LargePopUp
      header={commonTranslator.op}
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView>
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            const res = await resetStudentQuizEntryTime(
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
