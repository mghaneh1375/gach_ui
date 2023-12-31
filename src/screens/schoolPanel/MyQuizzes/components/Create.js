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
} from '../../../../styles/Common';
import QuizGeneralInfo from '../../../panel/quiz/components/Create/QuizGeneralInfo';
import translator from '../../../panel/quiz/Translator';
import commonTranslator from '../../../../translator/Common';
import QuizAnswerSheetInfo from '../../../panel/quiz/components/Create/QuizAnswerSheetInfo';
import {showError, showSuccess} from '../../../../services/Utility';
import QuizRunInfo from './QuizRunInfo';

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

    if (state.selectedQuiz.payByStudent !== undefined)
      setPayByStudent(state.selectedQuiz.payByStudent);

    setName(state.selectedQuiz.title);
    setLaunchMode(state.selectedQuiz.launchMode);
    setUseFromDatabase(state.selectedQuiz.database);
    setStart(state.selectedQuiz.start);
    setDescAfter(state.selectedQuiz.descAfter);
    setDescBefore(state.selectedQuiz.descBefore);
    setMinusMark(state.selectedQuiz.minusMark);
    setEnd(state.selectedQuiz.end === undefined ? '' : state.selectedQuiz.end);

    setShowResultsAfterCorrection(
      state.selectedQuiz.showResultsAfterCorrection,
    );
  }, [state.selectedQuiz, dispatch, props.editMode, backToList]);

  const [name, setName] = useState('');
  const [useFromDatabase, setUseFromDatabase] = useState(false);
  const [len, setLen] = useState(props.editMode ? state.selectedQuiz.len : '');
  const [lenMode, setLenMode] = useState(
    props.editMode ? state.selectedQuiz.lenMode : 'question',
  );
  const [payByStudent, setPayByStudent] = useState(false);
  const [launchMode, setLaunchMode] = useState();
  const [start, setStart] = useState(props.editMode ? undefined : '');
  const [end, setEnd] = useState(props.editMode ? undefined : '');
  const [showResultsAfterCorrection, setShowResultsAfterCorrection] =
    useState(true);

  const [minusMark, setMinusMark] = useState(undefined);
  const [kind, setKind] = useState();
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
    let res = await removeFile(
      props.token,
      filename,
      state.selectedQuiz.id,
      'school',
    );
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

    if (kind === 'regularWithPDF' && (len === undefined || len.length === 0)) {
      showError('لطفا مدت آزمون را مشخص نمایید');
      return;
    }
    data = {
      title: name,
      start: start,
      end: end,
      duration: len,
      database: useFromDatabase,
      launchMode: launchMode,
      minusMark: minusMark,
      showResultsAfterCorrection: showResultsAfterCorrection,
      descAfter: descAfter,
      desc: descBefore,
      payByStudent: payByStudent,
      kind: kind,
    };

    props.setLoading(true);
    let result = await CallAPI(
      data,
      props.editMode
        ? routes.editQuiz + 'school/' + state.selectedQuiz.id
        : routes.createQuiz + 'school',
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
        data.questionsCount = state.selectedQuiz.questionsCount;
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
        onBackClick={() => props.setMode('list')}
        child={
          <QuizGeneralInfo
            kind={kind}
            setKind={setKind}
            excludeTashrihi={true}
            name={name}
            setName={setName}
          />
        }
      />
      <CommonWebBox
        header={translator.runInfo}
        child={
          <QuizRunInfo
            isAdvisor={props.isAdvisor}
            editMode={props.editMode}
            kind={kind}
            start={start}
            end={end}
            payByStudent={payByStudent}
            setPayByStudent={setPayByStudent}
            isStart={
              state.selectedQuiz === undefined
                ? undefined
                : state.selectedQuiz.isStart
            }
            isEnd={
              state.selectedQuiz === undefined
                ? undefined
                : state.selectedQuiz.isEnd
            }
            setStart={setStart}
            setEnd={setEnd}
            lenMode={lenMode}
            setLenMode={setLenMode}
            len={len}
            setLen={setLen}
            setLaunchMode={setLaunchMode}
            useFromDatabase={useFromDatabase}
            setUseFromDatabase={setUseFromDatabase}
            launchMode={launchMode}
            minusMark={minusMark}
            setMinusMark={setMinusMark}
            status={state.selectedQuiz?.status}
            showResultsAfterCorrection={showResultsAfterCorrection}
            setShowResultsAfterCorrection={setShowResultsAfterCorrection}
          />
        }
      />

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
