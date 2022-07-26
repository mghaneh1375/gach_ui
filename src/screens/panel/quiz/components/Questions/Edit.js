import {useState} from 'react';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../tranlates/Common';
import {updateQuestionMark} from '../Utility';
import translator from '../../Translator';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton} from '../../../../../styles/Common';

function Edit(props) {
  const [mark, setMark] = useState(
    props.question !== undefined ? props.question.mark : 0,
  );

  return (
    <LargePopUp
      toggleShowPopUp={() => props.setShowEditPane(false)}
      btns={
        <CommonButton
          title={commonTranslator.confirm}
          onPress={async () => {
            props.setLoading(true);
            let res = await updateQuestionMark(
              props.token,
              props.quizId,
              props.quizGeneralMode,
              props.question.id,
              mark,
            );
            props.setLoading(false);
            if (res !== null) {
              showSuccess(commonTranslator.success);
              props.afterFunc(mark);
            }
          }}
        />
      }
      title={translator.editQuestion}>
      <JustBottomBorderTextInput
        value={mark}
        onChangeText={e => setMark(e)}
        justNum={true}
        placeholder={translator.mark}
      />
    </LargePopUp>
  );
}

export default Edit;
