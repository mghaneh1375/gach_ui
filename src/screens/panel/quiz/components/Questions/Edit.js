import {useState} from 'react';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../translator/Common';
import {updateQuestionMark} from '../Utility';
import translator from '../../Translator';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton} from '../../../../../styles/Common';
import RadioButtonYesOrNo from '../../../../../components/web/RadioButtonYesOrNo';

function Edit(props) {
  const [mark, setMark] = useState(
    props.question !== undefined ? props.question.mark : 0,
  );
  const [canUpload, setCanUpload] = useState(
    props.question.canUpload ? 'yes' : 'no',
  );

  return (
    <LargePopUp
      toggleShowPopUp={() => props.setShowEditPane(false)}
      btns={
        <CommonButton
          theme={'dark'}
          title={commonTranslator.confirm}
          onPress={async () => {
            props.setLoading(true);
            let res = await updateQuestionMark(
              props.token,
              props.quizId,
              props.quizGeneralMode,
              props.question.id,
              mark,
              props.quizGeneralMode === 'irysc' ? canUpload : undefined,
            );
            props.setLoading(false);
            if (res !== null) {
              showSuccess(commonTranslator.success);
              props.afterFunc(mark, canUpload === 'yes');
            }
          }}
        />
      }
      title={translator.editQuestion}>
      <JustBottomBorderTextInput
        value={mark}
        float={true}
        onChangeText={e => setMark(e)}
        justNum={true}
        subText={translator.mark}
        placeholder={translator.mark}
      />
      {props.question.canUpload !== undefined &&
        props.quizGeneralMode === 'irysc' && (
          <RadioButtonYesOrNo
            label={translator.isUploadable}
            selected={canUpload}
            setSelected={setCanUpload}
          />
        )}
    </LargePopUp>
  );
}

export default Edit;
