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
import {addSession, removeSessionFile, updateSession} from './../Utility';
import {styles} from '../../../../../styles/Common/Styles';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';
import {routes} from '../../../../../API/APIRoutes';
import axios from 'axios';
import {
  generalRequest,
  videoGeneralRequest,
  VIDEO_BASE_URL,
} from '../../../../../API/Utility';
import {trueFalseValues} from '../../../../../services/Utility';
import vars from '../../../../../styles/root';

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
  const [quizzes, setQuizzes] = useState();

  const [isWorking, setIsWorking] = useState(false);

  const [uploadVideo, setUploadVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const chunkSize = 1048576 * 3;

  const [videoFileForShow, setVideoFileForShow] = useState();

  let videoFile;
  let sessionId;

  const getFileContext = () => {
    resetChunkProperties();
    const _totalCount =
      videoFile.size % chunkSize == 0
        ? videoFile.size / chunkSize
        : Math.floor(videoFile.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file

    getGrantForUpload(_totalCount);
  };

  const getGrantForUpload = _totalCount => {
    Promise.all([
      videoGeneralRequest(
        routes.setSessionVideo +
          state.selectedContent.id +
          '/' +
          sessionId +
          '/' +
          videoFile.size,
        'post',
        undefined,
        'filename',
        props.token,
      ),
    ]).then(res => {
      if (res[0] != null) {
        fileUpload(0, _totalCount, res[0], 0, chunkSize);
      }
    });
  };

  const resetChunkProperties = () => {
    setProgress(0);
  };

  const fileUpload = (
    counter,
    chunkCount,
    filename,
    beginingOfTheChunk,
    endOfTheChunk,
  ) => {
    if (counter <= chunkCount) {
      var chunk = videoFile.slice(beginingOfTheChunk, endOfTheChunk);
      uploadChunk(counter, chunkCount, filename, endOfTheChunk, chunk);
    }
  };

  const uploadChunk = async (
    counter,
    chunkCount,
    filename,
    endOfTheChunk,
    chunk,
  ) => {
    try {
      const response = await axios.post(
        VIDEO_BASE_URL + routes.sessionVideoChunkFile + filename,
        chunk,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + props.token,
          },
        },
      );
      const data = response.data;
      if (data.status === 'ok') {
        if (counter == chunkCount - 1) {
          console.log('Process is complete, counter', counter);
          await uploadCompleted();
        } else {
          var percentage = Math.ceil((counter / chunkCount) * 100);
          setProgress(percentage);
          fileUpload(
            counter + 1,
            chunkCount,
            filename,
            endOfTheChunk,
            endOfTheChunk + chunkSize,
          );
        }
      } else {
        console.log('Error Occurred:', data.errorMessage);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const uploadCompleted = async () => {
    const response = await axios.post(
      VIDEO_BASE_URL +
        routes.completeUploadSessionVideo +
        state.selectedContent.id +
        '/' +
        sessionId,
      undefined,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
      },
    );
    const data = response.data;
    if (data.status == 'ok') {
      setProgress(100);
    }
  };

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
        setPrice(
          state.selectedSession.price == -1 ? 0 : state.selectedSession.price,
        );
        setPriority(state.selectedSession.priority);
        setVideo(state.selectedSession.video);
        setDuration(state.selectedSession.duration);

        setHasExam(state.selectedSession.hasExam);
        if (state.selectedSession.hasExam) {
          setExamId(state.selectedSession.examId);
          setExamMinMark(state.selectedSession.minMark);
        }

        props.setLoading(false);
        setIsWorking(false);
      }
    });
  }, [isWorking, props, state.selectedSession, quizzes]);

  const removeUploadedVideo = async () => {
    props.setLoading(true);
    let res = await removeSessionFile(
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

  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 200,
      accept: ['video/*'],
      readAs: 'ArrayBuffer',
      multiple: false,
    });

  React.useEffect(() => {
    fetchQuizzes();
  }, [state.selectedSession, fetchQuizzes]);

  React.useEffect(() => {
    if (videoFile !== undefined) {
      setUploadVideo(true);
    }
  }, [videoFile]);

  return (
    <CommonWebBox
      header={
        props.isInEditMode
          ? Translator.editSession + state.selectedSession.title
          : Translator.addNewSession
      }
      backBtn={true}
      onBackClick={() =>
        videoFileForShow === undefined
          ? props.setMode('sessions')
          : setVideoFileForShow(undefined)
      }>
      {videoFileForShow !== undefined && (
        <video controls src={videoFileForShow} />
      )}
      {!isWorking && videoFileForShow === undefined && (
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

      {videoFileForShow === undefined && (
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
      )}

      {videoFileForShow === undefined && (
        <PhoneView style={{...styles.gap15}}>
          <SimpleText
            style={{...styles.alignSelfCenter, ...styles.BlueBold}}
            text={Translator.video}
          />
          <SimpleFontIcon
            onPress={() => openFileSelector()}
            kind={'normal'}
            icon={faPaperclip}
          />

          <PhoneView style={{marginTop: 20}}>
            {video !== undefined && (
              <AttachBox
                onClick={() => setVideoFileForShow(video)}
                filename={video}
                removeAttach={async () => {
                  await removeUploadedVideo();
                }}
              />
            )}

            {filesContent !== undefined && filesContent.length > 0 && (
              <AttachBox
                filename={filesContent[0].name}
                removeAttach={() => {
                  remove(0);
                }}
              />
            )}
          </PhoneView>
        </PhoneView>
      )}

      {uploadVideo && (
        <SimpleText
          style={{color: vars.DARK_BLUE, fontSize: 20, alignSelf: 'center'}}
          text={
            progress !== 100
              ? ' در حال بارگذاری فایل لطفا شکیبا باشید ' + progress + '%'
              : 'فایل با موفقیت آپلود شد'
          }
        />
      )}

      {(!uploadVideo || progress === 100) && videoFileForShow === undefined && (
        <EqualTwoTextInputs>
          <CommonButton
            onPress={() => props.setMode('sessions')}
            title={commonTranslator.back}
          />
          {!uploadVideo && (
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
                  : await addSession(
                      props.token,
                      data,
                      state.selectedContent.id,
                    );

                props.setLoading(false);
                if (res != null) {
                  sessionId = props.isInEditMode
                    ? state.selectedSession.id
                    : res.id;

                  if (filesContent.length > 0) {
                    res.hasVideo = true;

                    setUploadVideo(true);

                    let buffer = filesContent[0].content;
                    videoFile = new Blob([
                      new Uint8Array(buffer, 0, buffer.length),
                    ]);

                    setTimeout(() => {
                      getFileContext();
                    }, 1000);
                  } else {
                    if (props.isInEditMode) {
                      res.video = state.selectedContent.video;
                      res.attaches = state.selectedContent.attaches;
                    }
                  }

                  let sessions = state.selectedContent.sessions;
                  if (props.isInEditMode) {
                    sessions = sessions.map(elem => {
                      if (elem.id === state.selectedSession.id) return res;
                      return elem;
                    });
                  } else sessions.push(res);

                  state.selectedContent.sessions = sessions;

                  dispatch({
                    selectedContent: state.selectedContent,
                    needUpdate: true,
                  });

                  if (filesContent.length === 0) props.setMode('sessions');
                }
              }}
              title={commonTranslator.confirm}
              theme="dark"
            />
          )}
        </EqualTwoTextInputs>
      )}
    </CommonWebBox>
  );
}

export default Create;
