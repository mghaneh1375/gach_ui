import React, {useState} from 'react';
import {
  faAngleDown,
  faAngleUp,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '@/styles/common/styles';
import commonTranslator from '@/translator/common';
import Translator from '../../translate';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import {statusKeyVals} from '../../../question/components/keyVals';
import {removeAd, store, update} from './utility';
import {useFilePicker} from 'use-file-picker';
import AttachBox from '../../../ticket/components/show/attachBox/AttachBox.jsx';
function Card(props) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 15,
      accept: ['video/*'],
      readAs: 'ArrayBuffer',
      multiple: false,
    });
  const removeFile = index => {
    remove(index);
  };
  const [title, setTitle] = useState();
  const [visibility, setVisibility] = useState();
  React.useEffect(() => {
    if (props.elem === undefined) {
      setShow(true);
      return;
    }
    setTitle(props.elem.title);
    setVisibility(props.elem.visibility);
    setFile(props.elem.file);
  }, [props.elem]);
  return (
    <>
      <CommonWebBox
        header={title !== undefined ? title : ''}
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
              onChangeText={e => setTitle(e)}
              placeholder={title}
              subText={Translator.advTitle}
            />

            <PhoneView
              style={{
                ...styles.gap15,
                ...styles.margin15,
              }}>
              {file === undefined && (
                <SimpleText
                  style={{
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                  }}
                  text={Translator.adv}
                />
              )}
              {file === undefined && (
                <SimpleFontIcon
                  onPress={() => openFileSelector()}
                  kind={'normal'}
                  icon={faPaperclip}
                />
              )}

              <PhoneView
                style={{
                  marginTop: 20,
                }}>
                {file !== undefined && (
                  <SimpleText
                    style={{
                      ...styles.BlueBold,
                      ...styles.cursor_pointer,
                    }}
                    text={'مشاهده فایل ویدیو بارگذاری شده'}
                    onPress={() => props.setVideoForShow(file)}
                  />
                )}

                {filesContent !== undefined &&
                  filesContent.length > 0 &&
                  filesContent.map((elem, index) => {
                    return (
                      <AttachBox
                        key={index}
                        filename={elem.name}
                        fileContent={elem.content}
                        removeAttach={() => {
                          removeFile(index);
                        }}
                      />
                    );
                  })}
              </PhoneView>
            </PhoneView>

            <JustBottomBorderSelect
              placeholder={commonTranslator.visibility}
              subText={commonTranslator.visibility}
              setter={setVisibility}
              values={statusKeyVals}
              value={statusKeyVals.find(elem => elem.id === visibility)}
            />
            {props.elem !== undefined && (
              <PhoneView
                style={{
                  ...styles.gap10,
                  ...styles.margin15,
                }}>
                <CommonButton
                  onPress={async () => {
                    props.setLoading(true);
                    const res = await removeAd(props.elem.id, props.token);
                    props.setLoading(false);
                    if (res !== null) {
                      setShow(false);
                      props.onDelete();
                    }
                  }}
                  title={commonTranslator.delete}
                />
                <CommonButton
                  onPress={async () => {
                    props.setLoading(true);
                    const data = {
                      visibility: visibility,
                      title: title,
                    };
                    const res = await update(props.elem.id, data, props.token);
                    props.setLoading(false);
                    if (res !== null) {
                      data.file = props.elem.file;
                      data.id = props.elem.id;
                      props.onUpdate(data);
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
                  const data = {
                    visibility: visibility,
                    title: title,
                  };
                  const res = await store(filesContent[0], data, props.token);
                  props.setLoading(false);
                  if (res !== null) {
                    data.id = res.id;
                    data.file = res.filename;
                    props.onAdd(data);
                  }
                }}
                title={commonTranslator.add}
              />
            )}
          </MyView>
        )}
      </CommonWebBox>
    </>
  );
}
export default Card;
