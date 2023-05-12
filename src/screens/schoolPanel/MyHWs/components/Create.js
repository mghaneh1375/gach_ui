import React, {useState} from 'react';
import {dispatchMyQuizzesContext, myQuizzesContext} from './Context';
import {useFilePicker} from 'use-file-picker';
import {routes} from '../../../../API/APIRoutes';
import {CallAPI} from '../../../panel/quiz/components/Create/CallAPI';
import {addFile, removeFile} from '../../../panel/quiz/components/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '../../../../styles/Common';
import translator from '../../../panel/quiz/Translator';
import commonTranslator from '../../../../translator/Common';
import QuizAnswerSheetInfo from '../../../panel/quiz/components/Create/QuizAnswerSheetInfo';
import {showSuccess, trueFalseValues} from '../../../../services/Utility';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import hwTranslator from './Translator';

const Create = props => {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  const backToList = React.useCallback(() => {
    props.setMode('list');
  }, [props]);

  React.useEffect(() => {
    if (props.editMode === undefined || !props.editMode) {
      dispatch({selectedQuiz: undefined});
      return;
    }
    if (state.selectedQuiz === undefined) {
      backToList();
      return;
    }

    setName(state.selectedQuiz.title);
    setAllowDelay(state.selectedQuiz.deleyEnd !== undefined);
    setDelayEnd(state.selectedQuiz.delayEnd);
    setDelayPenalty(state.selectedQuiz.delayPenalty);
    setAnswerType(state.selectedQuiz.answerType);
    setMaxUploadSize(state.selectedQuiz.maxFileSize);
    setStart(state.selectedQuiz.start);
    setDescAfter(state.selectedQuiz.descAfter);
    setEnd(state.selectedQuiz.end === undefined ? '' : state.selectedQuiz.end);

    setShowResultsAfterCorrection(
      state.selectedQuiz.showResultsAfterCorrection,
    );
  }, [state.selectedQuiz, dispatch, props.editMode, backToList]);

  const answerTypes = [
    {item: hwTranslator.pdf, id: 'pdf'},
    {item: hwTranslator.word, id: 'word'},
    {item: hwTranslator.powerpoint, id: 'powerpoint'},
    {item: hwTranslator.image, id: 'image'},
    {item: hwTranslator.audio, id: 'audio'},
    {item: hwTranslator.video, id: 'video'},
  ];

  const [name, setName] = useState('');
  const [maxUploadSize, setMaxUploadSize] = useState(5);
  const [answerType, setAnswerType] = useState();
  const [allowDelay, setAllowDelay] = useState(false);
  const [delayEnd, setDelayEnd] = useState();
  const [delayPenalty, setDelayPenalty] = useState();

  const [start, setStart] = useState(props.editMode ? undefined : '');
  const [end, setEnd] = useState(props.editMode ? undefined : '');
  const [showResultsAfterCorrection, setShowResultsAfterCorrection] =
    useState(true);

  const [descBefore, setDescBefore] = useState(undefined);
  const [descAfter, setDescAfter] = useState(undefined);
  const [attaches, setAttaches] = useState(
    state.selectedQuiz === undefined ? [] : state.selectedQuiz.attaches,
  );

  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 2,
      accept: '.pdf',
      readAs: 'DataURL',
      multiple: true,
    });

  const removeAttach = index => {
    remove(index);
  };

  const removeUploadedAttach = async filename => {
    props.setLoading(true);
    let res = await removeFile(props.token, filename, state.selectedQuiz.id);
    props.setLoading(false);
    if (res === null) return;
    let tmp = [];
    attaches.forEach(element => {
      if (element !== filename) tmp.push(element);
    });
    setAttaches(tmp);

    state.selectedQuiz.attaches = tmp;
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
  };

  const submit = async () => {
    let data = {};

    data = {
      title: name,
      start: start,
      end: end,
      showResultsAfterCorrection: showResultsAfterCorrection,
      maxUploadSize: maxUploadSize,
      answerType: answerType,
      descAfter: descAfter,
      desc: descBefore,
    };

    if (allowDelay) {
      data.delayEnd = delayEnd;
      data.delayPenalty = delayPenalty;
    }

    props.setLoading(true);
    let result = await CallAPI(
      data,
      props.editMode ? routes.editHW + state.selectedQuiz.id : routes.createHW,
      props.token,
      'school',
      undefined,
    );

    if (result !== null) {
      let quizId = props.editMode ? state.selectedQuiz.id : result.id;

      if (filesContent.length > 0) {
        let files = [];

        for (let i = 0; i < filesContent.length; i++) {
          let fileRes = await addFile(
            props.token,
            filesContent[i],
            quizId,
            'school',
          );
          if (fileRes !== null && fileRes !== undefined) files.push(fileRes);
        }

        if (props.editMode) data.attaches = files;
        else result.attaches = files;
        props.setLoading(false);
      } else {
        if (props.editMode) data.attaches = state.selectedQuiz.attaches;
        props.setLoading(false);
      }

      if (props.editMode) {
        data.id = state.selectedQuiz.id;
        data.status = state.selectedQuiz.status;
        data.visibility = state.selectedQuiz.visibility;
        data.attachesCount = state.selectedQuiz.attachesCount;
        data.studentsCount = state.selectedQuiz.studentsCount;
        dispatch({selectedQuiz: data, needUpdate: true});
      } else {
        let allQuizzes = state.quizzes;
        if (allQuizzes === undefined) allQuizzes = [];
        allQuizzes.unshift(result);
        dispatch({quizzes: allQuizzes});
      }
      showSuccess();
      backToList();
    } else props.setLoading(false);
  };

  return (
    <MyView>
      <CommonWebBox
        header={translator.generalInfo}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView style={{gap: 15}}>
          <JustBottomBorderTextInput
            placeholder={translator.name}
            onChangeText={e => setName(e)}
            value={name}
            subText={translator.name}
          />
        </PhoneView>
      </CommonWebBox>
      <CommonWebBox header={translator.runInfo}>
        <PhoneView style={{gap: 15}}>
          <JustBottomBorderSelect
            values={trueFalseValues}
            value={
              showResultsAfterCorrection === undefined
                ? {}
                : trueFalseValues.filter(element => {
                    return element.id === showResultsAfterCorrection;
                  })[0]
            }
            setter={setShowResultsAfterCorrection}
            subText={translator.showResultAfterCorrection}
            placeholder={translator.showResultAfterCorrection}
          />
          <JustBottomBorderSelect
            values={answerTypes}
            value={
              answerType === undefined
                ? {}
                : answerTypes.filter(element => {
                    return element.id === answerType;
                  })[0]
            }
            setter={setAnswerType}
            subText={hwTranslator.answerType}
            placeholder={hwTranslator.answerType}
          />

          <JustBottomBorderTextInput
            value={maxUploadSize}
            onChangeText={e => setMaxUploadSize(e)}
            placeholder={hwTranslator.maxUploadSize}
            subText={hwTranslator.maxUploadSize}
            justNum={true}
          />
          {(state.selectedQuiz === undefined ||
            state.selectedQuiz.isStart === undefined ||
            !state.selectedQuiz.isStart) && (
            <JustBottomBorderDatePicker
              placeholder={translator.startDate}
              value={start}
              setter={setStart}
              subText={translator.startDate}
            />
          )}
          {(state.selectedQuiz === undefined ||
            state.selectedQuiz.isEnd === undefined ||
            !state.selectedQuiz.isEnd) && (
            <JustBottomBorderDatePicker
              placeholder={translator.endDate}
              value={end}
              setter={setEnd}
              subText={translator.endDate}
            />
          )}
          {(state.selectedQuiz === undefined ||
            state.selectedQuiz.isEnd === undefined ||
            !state.selectedQuiz.isEnd) && (
            <>
              <JustBottomBorderSelect
                values={trueFalseValues}
                value={
                  allowDelay === undefined
                    ? {}
                    : trueFalseValues.filter(element => {
                        return element.id === allowDelay;
                      })[0]
                }
                setter={setAllowDelay}
                subText={hwTranslator.allowDelay}
                placeholder={hwTranslator.allowDelay}
              />
              {allowDelay && (
                <>
                  <JustBottomBorderDatePicker
                    value={delayEnd}
                    setter={setDelayEnd}
                    subText={hwTranslator.delayEnd}
                    placeholder={hwTranslator.delayEnd}
                  />
                  <JustBottomBorderTextInput
                    value={delayPenalty}
                    onChangeText={e => setDelayPenalty(e)}
                    placeholder={hwTranslator.delayPenalty}
                    subText={hwTranslator.delayPenalty}
                    justNum={true}
                  />
                </>
              )}
            </>
          )}
        </PhoneView>
      </CommonWebBox>

      {(state.selectedQuiz === undefined ||
        state.selectedQuiz.isEnd === undefined ||
        !state.selectedQuiz.isEnd) && (
        <CommonWebBox
          header={translator.answerSheetInfo}
          child={
            <QuizAnswerSheetInfo
              descBefore={descBefore}
              setDescBefore={setDescBefore}
              descAfter={descAfter}
              setDescAfter={setDescAfter}
              setLoading={props.setLoading}
              token={props.token}
              navigator={props.navigator}
              openFileSelector={openFileSelector}
              filesContent={filesContent}
              removeAttach={removeAttach}
              removeUploadedAttach={removeUploadedAttach}
              attaches={attaches}
            />
          }
        />
      )}

      <EqualTwoTextInputs>
        <CommonButton
          onPress={() => props.setMode('list')}
          title={commonTranslator.cancel}
        />
        <CommonButton
          onPress={() => submit()}
          theme={'dark'}
          title={commonTranslator.confirmChanges}
        />
      </EqualTwoTextInputs>
    </MyView>
  );
};

export default Create;
