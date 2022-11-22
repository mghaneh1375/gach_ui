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
import {
  addFile,
  addSession,
  removeFile,
  setSessionFile,
  store,
  update,
  updateSession,
} from './../Utility';
import {styles} from '../../../../../styles/Common/Styles';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';

function Create(props) {
  let ckEditor = null;

  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [visibility, setVisibility] = useState();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [priority, setPriority] = useState();
  const [hasExam, setHasExam] = useState();

  const [examId, setExamId] = useState();
  const [examMinMark, setExamMinMark] = useState();
  const [videos, setVideos] = useState();
  const [attaches, setAttaches] = useState();
  const [quizzes, setQuizzes] = useState();

  const [isWorking, setIsWorking] = useState(false);

  const fetchQuizzes = React.useCallback(() => {
    if (isWorking || quizzes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getAllQuizzesDigest,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      if (!props.isInEditMode) props.setLoading(false);

      if (res[0] === null) {
        props.setMode('list');
        props.setLoading(false);
        return;
      }

      setQuizzes(res[0]);

      if (!props.isInEditMode) setIsWorking(false);

      if (props.isInEditMode !== undefined && props.isInEditMode) {
        setVisibility(state.selectedSession.visibility);
        setDescription(state.selectedSession.description);
        setTitle(state.selectedSession.title);
        setPrice(state.selectedSession.price);
        setImg(state.selectedSession.img);
        setAttaches(state.selectedSession.attaches);
        setVideos(state.selectedSession.videos);
        setDuration(state.selectedSession.duration);

        setHasExam(state.selectedSession.hasExam);
        if (state.selectedSession.hasExam) {
          setExamId(state.selectedSession.examId);
          setExamMinMark(state.selectedSession.minMark);
        }

        setIsWorking(false);
      }
    });
  }, [isWorking, props, state.selectedSession, quizzes]);

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

  React.useEffect(() => {
    fetchQuizzes();
  }, [state.selectedSession, fetchQuizzes]);

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
            onChangeText={e => setDuration(e)}
            value={duration}
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
                    await removeUploadedImg();
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
              priority: priority,
              title: title,
              duration: duration,
            };

            if (price !== undefined) {
              data.price = price;
            }

            if (hasExam) {
              data.examId = examId;
              data.minMark = examMinMark;
            }

            props.setLoading(true);
            let res = props.isInEditMode
              ? await updateSession(
                  props.token,
                  data,
                  state.selectedContent.id,
                  state.selectedSession.id,
                )
              : await addSession(props.token, data, state.selectedContent.id);

            if (res != null) {
              let sessionId = props.isInEditMode
                ? state.selectedSession.id
                : res.id;

              if (filesContentImg.length > 0) {
                let img = undefined;

                let fileRes = await setSessionFile(
                  props.token,
                  filesContentImg[0],
                  state.selectedContent.id,
                  sessionId,
                  'img',
                );
                if (fileRes !== null && fileRes !== undefined) img = fileRes;

                res.img = img;
                props.setLoading(false);
              } else {
                if (props.isInEditMode) res.img = state.selectedContent.img;
                props.setLoading(false);
              }

              let sessions = state.selectedContent.sessions;
              if (props.isInEditMode) {
                sessions = sessions.map(elem => {
                  if (elem.id === state.selectedSession.id) return res;
                  return elem;
                });
              } else sessions.push(res);

              state.selectedContent.sessions = sessions;

              dispatch({selectedContent: state.selectedContent});
              props.setMode('sessionList');
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
