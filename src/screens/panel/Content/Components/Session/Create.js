import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {statusKeyVals} from '../../../question/components/KeyVals';
import Translator from '../../Translate';
import commonTranslator from '../../../../../translator/Common';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../../../../../services/MyUploadAdapter';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {contentContext, dispatchContentContext} from './../Context';
import {addFile, removeFile, store, update} from './../Utility';
import {styles} from '../../../../../styles/Common/Styles';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';

function Create(props) {
  let ckEditor = null;

  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [visibility, setVisibility] = useState();
  const [description, setDescription] = useState();
  const [preReq, setPreReq] = useState();
  const [title, setTitle] = useState();
  const [teacher, setTeacher] = useState();
  const [price, setPrice] = useState();
  const [sessionsCount, setSessionsCount] = useState();

  const [duration, setDuration] = useState();

  const [isWorking, setIsWorking] = useState(false);

  const [tags, setTags] = useState([]);
  const [hasExam, setHasExam] = useState();
  const [finalExamId, setFinalExamId] = useState();
  const [finalExamMinMark, setFinalExamMinMark] = useState();

  const removeUploadedImg = async () => {
    props.setLoading(true);
    let res = await removeFile(props.token, state.selectedContent.id);
    props.setLoading(false);
    if (res === null) return;
    setImg(undefined);

    state.selectedContent.img = undefined;
    dispatch({selectedContent: state.selectedContent, needUpdate: true});
  };

  const [img, setImg] = useState();
  const [
    openFileSelectorImg,
    {filesContentImg, loadingImg, errorsImg, clearImg, removeImg},
  ] = useFilePicker({
    maxFileSize: 6,
    accept: ['image/*'],
    readAs: 'DataURL',
    multiple: false,
  });

  const [
    openFileSelectorVideo,
    {filesContentVideo, loadingVideo, errorsVideo, clearVideo, removeVideo},
  ] = useFilePicker({
    maxFileSize: 6,
    accept: ['video/*'],
    readAs: 'DataURL',
    multiple: true,
  });
  const [
    openFileSelectorAttaches,
    {
      filesContentAttaches,
      loadingAttaches,
      errorsAttaches,
      clearAttaches,
      removeAttaches,
    },
  ] = useFilePicker({
    maxFileSize: 6,
    accept: ['image/*', 'pdf', 'docx', 'ppt', 'pptx', 'video/*', 'zip'],
    readAs: 'DataURL',
    multiple: true,
  });

  React.useEffect(() => {}, [state.selectedSession]);

  return (
    <CommonWebBox
      header={
        props.isInEditMode
          ? Translator.editSession + state.selectedSession.title
          : Translator.addNewSession
      }
      backBtn={true}
      onBackClick={() => props.setMode('sessions')}>
      {!isWorking && (
        <PhoneView style={{gap: 10}}>
          <JustBottomBorderTextInput
            placeholder={Translator.title}
            onChangeText={e => setTitle(e)}
            value={title}
            subText={Translator.title}
          />

          <JustBottomBorderTextInput
            placeholder={Translator.price}
            onChangeText={e => setPrice(e)}
            value={price}
            justNum={true}
            subText={Translator.price}
          />

          <JustBottomBorderSelect
            placeholder={commonTranslator.visibility}
            subText={commonTranslator.visibility}
            setter={setVisibility}
            values={statusKeyVals}
            value={statusKeyVals.find(elem => elem.id === visibility)}
          />

          <JustBottomBorderTextInput
            placeholder={Translator.sessionDuration}
            onChangeText={e => setSessionsDuration(e)}
            value={sessionDuration}
            justNum={true}
            subText={Translator.sessionDuration}
          />
        </PhoneView>
      )}

      <CKEditor
        editor={ClassicEditor}
        config={{
          customValues: {token: props.token},
          extraPlugins: [MyCustomUploadAdapterPlugin],
          placeholder: Translator.description,
        }}
        data={description === undefined ? '' : description}
        onReady={editor => {
          ckEditor = editor;
        }}
        onChange={(event, editor) => {
          setDescription(editor.getData());
        }}
      />

      <PhoneView style={{...styles.gap15}}>
        <SimpleText
          style={{...styles.alignSelfCenter, ...styles.BlueBold}}
          text={Translator.image}
        />
        <SimpleFontIcon
          onPress={() => openFileSelectorImg()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView style={{marginTop: 20}}>
          {img !== undefined && (
            <AttachBox
              filename={img}
              removeAttach={async () => {
                await removeUploadedImg();
              }}
            />
          )}

          {filesContentImg !== undefined &&
            filesContentImg.length > 0 &&
            filesContentImg.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem.name}
                  fileContent={elem.content}
                  removeAttach={() => {
                    removeImg(index);
                  }}
                />
              );
            })}
        </PhoneView>
      </PhoneView>

      <PhoneView style={{...styles.gap15}}>
        <SimpleText
          style={{...styles.alignSelfCenter, ...styles.BlueBold}}
          text={Translator.image}
        />
        <SimpleFontIcon
          onPress={() => openFileSelectorVideo()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView style={{marginTop: 20}}>
          {videos !== undefined &&
            videos.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem}
                  removeAttach={async () => {
                    await removeUploaded();
                  }}
                />
              );
            })}

          {filesContentImg !== undefined &&
            filesContentImg.length > 0 &&
            filesContentImg.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem.name}
                  fileContent={elem.content}
                  removeAttach={() => {
                    removeImg(index);
                  }}
                />
              );
            })}
        </PhoneView>
      </PhoneView>

      <EqualTwoTextInputs>
        <CommonButton
          onPress={() => props.setMode('list')}
          title={commonTranslator.back}
        />
        <CommonButton
          onPress={async () => {
            let data = {
              visibility: visibility,
              description: description,
              preReq: preReq,
              title: title,
              teacher: teacher,
              price: price,
              sessionsCount: sessionsCount,
              teacherBio: teacherBio,
              tags: tags,
            };

            if (hasCert) {
              data.duration = duration;
              data.certId = certId;
            }

            if (hasExam) {
              data.finalExamId = finalExamId;
              data.finalExamMinMark = finalExamMinMark;
            }

            props.setLoading(true);
            let res = props.isInEditMode
              ? await update(props.token, data, state.selectedContent.id)
              : await store(props.token, data);

            if (res != null) {
              let contentId = props.isInEditMode
                ? state.selectedContent.id
                : res.id;

              if (filesContent.length > 0) {
                let img = undefined;

                let fileRes = await addFile(
                  props.token,
                  filesContent[0],
                  contentId,
                );
                if (fileRes !== null && fileRes !== undefined) img = fileRes;

                res.img = img;
                props.setLoading(false);
              } else {
                if (props.isInEditMode) res.img = state.selectedContent.img;
                props.setLoading(false);
              }

              let contents = state.contents;
              if (props.isInEditMode) {
                contents = contents.map(elem => {
                  if (elem.id === state.selectedContent.id) return res;
                  return elem;
                });
              } else contents.push(res);
              dispatch({contents: contents});
              props.setMode('list');
            } else props.setLoading(false);
          }}
          title={commonTranslator.confirm}
          theme="dark"
        />
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Create;
