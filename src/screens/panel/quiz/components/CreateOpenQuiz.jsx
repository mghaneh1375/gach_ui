import React, {useState} from 'react';
import {CommonButton, CommonWebBox, EqualTwoTextInputs, MyView} from '@/styles';
import QuizAnswerSheetInfo from './create/QuizAnswerSheetInfo.jsx';
import QuizGeneralInfo from './create/QuizGeneralInfo.jsx';
import QuizRegistryInfo from './create/QuizRegistryInfo.jsx';
import QuizRunInfo from './create/QuizRunInfo.jsx';
import commonTranslator from '@/translator/common';
import translator from '../translator';
import {CallAPI} from './create/callAPI';
import {routes} from '@/api/apiRoutes';
import {dispatchQuizContext, quizContext} from './Context.jsx';
import {addFile, getTags, removeFile} from './utility';
import {useFilePicker} from 'use-file-picker';
import {showSuccess} from '@/services/utility';
const CreateOpenQuiz = props => {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const backToList = React.useCallback(() => {
    props.setMode('list');
  }, [props]);
  React.useEffect(() => {
    if (props.editMode === undefined || !props.editMode) return;
    if (state.selectedQuiz === undefined) {
      backToList();
      return;
    }
    setName(state.selectedQuiz.title);
    setPriority(state.selectedQuiz.priority);
    setDesc(state.selectedQuiz.description);
    setTags(state.selectedQuiz.tags);
    setKind(state.selectedQuiz.mode);
    setPrice(state.selectedQuiz.price);
    setDescAfter(state.selectedQuiz.descAfter);
    setDescBefore(state.selectedQuiz.descBefore);
    setMinusMark(state.selectedQuiz.minusMark);
  }, [state.selectedQuiz, props.editMode, backToList]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [kind, setKind] = useState();
  const [priority, setPriority] = useState();
  const [tags, setTags] = useState([]);
  const [len, setLen] = useState(props.editMode ? state.selectedQuiz.len : '');
  const [lenMode, setLenMode] = useState(
    props.editMode ? state.selectedQuiz.lenMode : 'question',
  );
  const [minusMark, setMinusMark] = useState(undefined);
  const [price, setPrice] = useState();
  const [descBefore, setDescBefore] = useState(undefined);
  const [descAfter, setDescAfter] = useState(undefined);
  const [isWorking, setIsWorking] = useState(false);
  const [attaches, setAttaches] = useState(
    state.selectedQuiz === undefined ? [] : state.selectedQuiz.attaches,
  );
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['image/*'],
      readAs: 'DataURL',
      multiple: true,
    });
  const removeAttach = index => {
    remove(index);
  };
  const removeUploadedAttach = async filename => {
    props.setLoading(true);
    const res = await removeFile(
      props.token,
      filename,
      state.selectedQuiz.id,
      'open',
    );
    props.setLoading(false);
    if (res === null) return;
    const tmp = [];
    attaches.forEach(element => {
      if (element !== filename) tmp.push(element);
    });
    setAttaches(tmp);
    state.selectedQuiz.attaches = tmp;
    dispatch({
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
    });
  };
  React.useEffect(() => {
    if (isWorking || state.tags !== undefined) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([getTags()]).then(res => {
      props.setLoading(false);
      if (res[0] !== undefined)
        dispatch({
          tags: res[0].map(elem => {
            return {
              id: elem,
              name: elem,
            };
          }),
        });
      setIsWorking(false);
    });
  }, [props, dispatch, state.tags, isWorking]);
  const submit = async () => {
    const data = {
      title: name,
      description: desc,
      duration: len,
      tags: tags,
      priority: priority,
      price: price,
      minusMark: minusMark,
      descAfter: descAfter,
      desc: descBefore,
    };
    props.setLoading(true);
    const result = await CallAPI(
      data,
      props.editMode
        ? routes.editQuiz + props.quizGeneralMode + '/' + state.selectedQuiz.id
        : routes.createQuiz + props.quizGeneralMode,
      props.token,
      props.quizGeneralMode,
    );
    if (result !== null) {
      const quizId = props.editMode ? state.selectedQuiz.id : result.id;
      if (filesContent.length > 0) {
        const files = [];
        for (let i = 0; i < filesContent.length; i++) {
          const fileRes = await addFile(
            props.token,
            filesContent[i],
            quizId,
            'open',
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
        data.generalMode = 'open';
        dispatch({
          selectedQuiz: data,
          needUpdate: true,
        });
      } else {
        const allQuizzes = state.quizzes;
        allQuizzes.unshift(result);
        dispatch({
          quizzes: allQuizzes,
        });
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
            name={name}
            setName={setName}
            kind={kind}
            setKind={setKind}
            tags={tags}
            setTags={setTags}
            desc={desc}
            setDesc={setDesc}
            priority={priority}
            setPriority={setPriority}
          />
        }
      />
      <CommonWebBox
        header={translator.runInfo}
        child={
          <QuizRunInfo
            quizGeneralMode={props.quizGeneralMode}
            lenMode={lenMode}
            setLenMode={setLenMode}
            len={len}
            setLen={setLen}
            minusMark={minusMark}
            setMinusMark={setMinusMark}
          />
        }
      />
      <CommonWebBox
        header={translator.registryInfo}
        child={
          <QuizRegistryInfo
            quizGeneralMode={props.quizGeneralMode}
            price={price}
            setPrice={setPrice}
          />
        }
      />

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

      <EqualTwoTextInputs>
        <CommonButton
          onPress={() => props.setMode('list')}
          title={commonTranslator.cancel}
        />
        {props.canEdit && (
          <CommonButton
            onPress={() => submit()}
            theme={'dark'}
            title={commonTranslator.confirmChanges}
          />
        )}
      </EqualTwoTextInputs>
    </MyView>
  );
};
export default CreateOpenQuiz;
