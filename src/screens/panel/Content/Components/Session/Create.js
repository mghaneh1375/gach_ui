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
  addSession,
  removeFile,
  setSessionFile,
  updateSession,
} from './../Utility';
import {styles} from '../../../../../styles/Common/Styles';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {trueFalseValues} from '../../../../../services/Utility';

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
  const [video, setVideo] = useState();
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

        setAttaches(state.selectedSession.attaches);
        setVideo(state.selectedSession.video);
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

  const removeUploadedVideo = async () => {
    props.setLoading(true);
    let res = await removeFile(
      props.token,
      state.selectedContent.id,
      state.selectedSession.id,
    );
    props.setLoading(false);
    if (res === null) return;
    setVideo(undefined);

    state.selectedSession.video = undefined;
    dispatch({selectedSession: state.selectedSession, needUpdateSession: true});
  };

  const removeUploadedAttach = async () => {
    props.setLoading(true);
    let res = await removeFile(
      props.token,
      state.selectedContent.id,
      state.selectedSession.id,
    );
    props.setLoading(false);
    if (res === null) return;
    setVideo(undefined);

    state.selectedSession.video = undefined;
    dispatch({selectedSession: state.selectedSession, needUpdateSession: true});
  };

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
            placeholder={Translator.sessionTitle}
            onChangeText={e => setTitle(e)}
            value={title}
            subText={Translator.sessionTitle}
          />

          <JustBottomBorderTextInput
            placeholder={Translator.price}
            onChangeText={e => setPrice(e)}
            value={price}
            justNum={true}
            subText={Translator.sessionPriceHelp}
          />

          <JustBottomBorderTextInput
            placeholder={Translator.priority}
            onChangeText={e => setPriority(e)}
            value={priority}
            justNum={true}
            subText={Translator.priority}
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
            subText={Translator.sessionDurationHelp}
          />

          <JustBottomBorderSelect
            placeholder={Translator.hasExam}
            subText={Translator.hasExam}
            setter={setHasExam}
            values={trueFalseValues}
            value={trueFalseValues.find(elem => elem.id === hasExam)}
          />

          {hasExam !== undefined && hasExam && (
            <JustBottomBorderTextInput
              placeholder={Translator.finalExamMinMark}
              subText={Translator.finalExamMinMark}
              onChangeText={e => setExamMinMark(e)}
              value={examMinMark}
              justNum={true}
            />
          )}

          {hasExam !== undefined && hasExam && quizzes !== undefined && (
            <JustBottomBorderTextInput
              resultPane={true}
              reset={false}
              value={
                examId === undefined
                  ? ''
                  : quizzes.filter(element => {
                      return element.id === examId;
                    })[0].name
              }
              placeholder={Translator.finalExam}
              subText={Translator.finalExam}
              setSelectedItem={item => setExamId(item.id)}
              values={quizzes}
            />
          )}
        </PhoneView>
      )}

      <CKEditor
        editor={ClassicEditor}
        config={{
          customValues: {token: props.token},
          extraPlugins: [MyCustomUploadAdapterPlugin],
          placeholder: Translator.sessionDescription,
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
          text={Translator.video}
        />
        <SimpleFontIcon
          onPress={() => openFileSelectorVideo()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView style={{marginTop: 20}}>
          {video !== undefined && (
            <AttachBox
              filename={video}
              removeAttach={async () => {
                await removeUploadedVideo();
              }}
            />
          )}

          {filesContentVideo !== undefined &&
            filesContentVideo.length > 0 &&
            filesContentVideo.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem.name}
                  fileContent={elem.content}
                  removeAttach={() => {
                    removeVideo(index);
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
          onPress={() => openFileSelectorAttaches()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView style={{marginTop: 20}}>
          {attaches !== undefined &&
            attaches.length > 0 &&
            attaches.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem}
                  removeAttach={async () => {
                    await removeUploadedAttach();
                  }}
                />
              );
            })}

          {filesContentAttaches !== undefined &&
            filesContentAttaches.length > 0 &&
            filesContentAttaches.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem.name}
                  fileContent={elem.content}
                  removeAttach={() => {
                    removeAttaches(index);
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

              if (filesContentVideo.length > 0) {
                let v = undefined;

                let fileRes = await setSessionFile(
                  props.token,
                  filesContentVideo[0],
                  state.selectedContent.id,
                  sessionId,
                  'video',
                );
                if (fileRes !== null && fileRes !== undefined) v = fileRes;

                res.video = v;

                if (filesContentAttaches.length > 0) {
                  let all_attaches = undefined;

                  for (let i = 0; i < filesContentAttaches.length; i++) {
                    let fileRes = await setSessionFile(
                      props.token,
                      filesContentAttaches[i],
                      state.selectedContent.id,
                      sessionId,
                      'attach',
                    );
                    if (fileRes !== null && fileRes !== undefined)
                      all_attaches.push(fileRes);
                  }

                  res.attaches = all_attaches;
                }
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
