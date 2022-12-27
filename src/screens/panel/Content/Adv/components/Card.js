import React, {useState} from 'react';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../../styles/Common/Styles';
import commonTranslator from '../../../../../translator/Common';
import Translator from '../../Translate';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {statusKeyVals} from '../../../question/components/KeyVals';
import {store, update} from './Utility';
import {useFilePicker} from 'use-file-picker';

function Card(props) {
  const [show, setShow] = useState(false);

  const removeUploadedFile = async () => {
    props.setLoading(true);
    let res = await removeFile(props.token, state.selectedContent.id);
    props.setLoading(false);
    if (res === null) return;
    setImg(undefined);

    state.selectedContent.img = undefined;
    dispatch({selectedContent: state.selectedContent, needUpdate: true});
  };

  const [file, setFile] = useState();
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['video/*'],
      readAs: 'DataURL',
      multiple: false,
    });

  const [visibility, setVisibility] = useState();

  React.useEffect(() => {
    if (props.elem === undefined) {
      setShow(true);
      return;
    }
    setQuestion(props.elem.question);
    setAnswer(props.elem.answer);
    setPriority(props.elem.priority);
    setVisibility(props.elem.visibility);
  }, [props.elem]);

  return (
    <CommonWebBox
      header={question !== undefined ? question : ''}
      btn={
        <SimpleFontIcon
          onPress={() => setShow(!show)}
          kind="med"
          icon={show ? faAngleDown : faAngleUp}
        />
      }
      width={'calc(25% - 10px)'}>
      {show && (
        <MyView>
          <JustBottomBorderTextInput
            onChangeText={e => setQuestion(e)}
            placeholder={question}
            subText={Translator.question}
          />

          <JustBottomBorderSelect
            placeholder={commonTranslator.visibility}
            subText={commonTranslator.visibility}
            setter={setVisibility}
            values={statusKeyVals}
            value={statusKeyVals.find(elem => elem.id === visibility)}
          />
          {props.elem !== undefined && (
            <PhoneView style={{...styles.gap10, ...styles.margin15}}>
              <CommonButton
                onPress={async () => {
                  props.setLoading(true);
                  let res = await remove(props.elem.id, props.token);
                  props.setLoading(false);
                  if (res !== null) {
                    props.onDelete();
                  }
                }}
                title={commonTranslator.delete}
              />
              <CommonButton
                onPress={async () => {
                  props.setLoading(true);
                  let res = await update(
                    props.elem.id,
                    {
                      visibility: visibility,
                    },
                    props.token,
                  );
                  props.setLoading(false);
                  if (res !== null) {
                    props.onUpdate(res);
                  }
                }}
                theme={'dark'}
                title={commonTranslator.update}
              />
            </PhoneView>
          )}
          {props.elem === undefined && (
            <CommonButton
              onPress={async () => {
                props.setLoading(true);
                let res = await store(
                  {
                    visibility: visibility,
                  },
                  props.token,
                );
                props.setLoading(false);
                if (res !== null) {
                  props.onAdd(res);
                }
              }}
              title={commonTranslator.add}
            />
          )}
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Card;
