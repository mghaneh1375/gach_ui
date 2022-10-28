import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
} from '../../../../styles/Common';
import QuizAnswerSheetInfo from './Create/QuizAnswerSheetInfo';
import QuizGeneralInfo from './Create/QuizGeneralInfo';
import QuizRegistryInfo from './Create/QuizRegistryInfo';
import QuizRunInfo from './Create/QuizRunInfo';
import commonTranslator from '../../../../translator/Common';
import translator from '../Translator';
import {CallAPI} from './Create/CallAPI';
import {routes} from '../../../../API/APIRoutes';
import {dispatchQuizContext, quizContext} from './Context';
import {addFile, getTags, removeFile} from './Utility';
import {useFilePicker} from 'use-file-picker';
import {showSuccess} from '../../../../services/Utility';

const CreateQuiz = props => {
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
    setDesc(state.selectedQuiz.description);
    setTags(state.selectedQuiz.tags);
    setKind(state.selectedQuiz.mode);
    setCapacity(state.selectedQuiz.capacity);
    setLaunchMode(state.selectedQuiz.launchMode);
    setPrice(state.selectedQuiz.price);
    setRanking(state.selectedQuiz.topStudentsCount);
    setStart(state.selectedQuiz.start);
    setDescAfter(state.selectedQuiz.descAfter);
    setDescBefore(state.selectedQuiz.descBefore);
    setMinusMark(state.selectedQuiz.minusMark);
    setPermuteEn(state.selectedQuiz.permute);
    setBackEn(state.selectedQuiz.backEn);

    setEnd(state.selectedQuiz.end === undefined ? '' : state.selectedQuiz.end);
    setStartRegistry(state.selectedQuiz.startRegistry);
    setEndRegistry(
      state.selectedQuiz.endRegistry === undefined
        ? ''
        : state.selectedQuiz.endRegistry,
    );
    setShowResultsAfterCorrection(
      state.selectedQuiz.showResultsAfterCorrection,
    );
    setShowResultsAfterCorrectionNotLoginUsers(
      state.selectedQuiz.showResultsAfterCorrectionNotLoginUsers,
    );
  }, [state.selectedQuiz, props.editMode, backToList]);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [kind, setKind] = useState();
  const [tags, setTags] = useState([]);
  const [len, setLen] = useState(props.editMode ? state.selectedQuiz.len : '');
  const [lenMode, setLenMode] = useState(
    props.editMode ? state.selectedQuiz.lenMode : 'question',
  );
  const [launchMode, setLaunchMode] = useState();
  const [start, setStart] = useState(props.editMode ? undefined : '');
  const [end, setEnd] = useState(props.editMode ? undefined : '');
  const [price, setPrice] = useState();
  const [ranking, setRanking] = useState();
  const [capacity, setCapacity] = useState();
  const [backEn, setBackEn] = useState(undefined);
  const [permuteEn, setPermuteEn] = useState(undefined);
  const [showResultsAfterCorrection, setShowResultsAfterCorrection] =
    useState(true);
  const [
    showResultsAfterCorrectionNotLoginUsers,
    setShowResultsAfterCorrectionNotLoginUsers,
  ] = useState(false);
  const [minusMark, setMinusMark] = useState(undefined);

  const [startRegistry, setStartRegistry] = useState(
    props.editMode ? undefined : '',
  );
  const [endRegistry, setEndRegistry] = useState(
    props.editMode ? undefined : '',
  );

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

  React.useEffect(() => {
    if (isWorking || state.tags !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([getTags()]).then(res => {
      props.setLoading(false);
      if (res[0] !== undefined)
        dispatch({
          tags: res[0].map(elem => {
            return {id: elem, name: elem};
          }),
        });
      setIsWorking(false);
    });
  }, [props, dispatch, state.tags, isWorking]);

  const submit = async () => {
    const data = {
      title: name,
      description: desc,
      start: start,
      end: end,
      startRegistry: startRegistry,
      // kind: kind,
      duration: len,
      launchMode: launchMode,
      tags: tags,
      price: price,
      permute: permuteEn,
      capacity: capacity,
      minusMark: minusMark,
      backEn: backEn,
      showResultsAfterCorrection: showResultsAfterCorrection,
      showResultsAfterCorrectionNotLoginUsers:
        showResultsAfterCorrectionNotLoginUsers,
      topStudentsCount: ranking,
      descAfter: descAfter,
      desc: descBefore,
    };
    if (endRegistry !== undefined) data.endRegistry = endRegistry;

    props.setLoading(true);
    let result = await CallAPI(
      data,
      props.editMode
        ? routes.editQuiz + props.quizGeneralMode + '/' + state.selectedQuiz.id
        : routes.createQuiz + props.quizGeneralMode,
      props.token,
      props.quizGeneralMode,
    );

    if (result !== null) {
      let quizId = props.editMode ? state.selectedQuiz.id : result.id;

      if (filesContent.length > 0) {
        let files = [];

        for (let i = 0; i < filesContent.length; i++) {
          let fileRes = await addFile(props.token, filesContent[i], quizId);
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
        dispatch({selectedQuiz: data, needUpdate: true});
      } else {
        let allQuizzes = state.quizzes;
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
            name={name}
            setName={setName}
            kind={kind}
            setKind={setKind}
            tags={tags}
            setTags={setTags}
            desc={desc}
            setDesc={setDesc}
          />
        }
      />
      <CommonWebBox
        header={translator.runInfo}
        child={
          <QuizRunInfo
            quizGeneralMode={props.quizGeneralMode}
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
            lenMode={lenMode}
            setLenMode={setLenMode}
            len={len}
            setLen={setLen}
            setLaunchMode={setLaunchMode}
            launchMode={launchMode}
            backEn={backEn}
            setBackEn={setBackEn}
            permuteEn={permuteEn}
            setPermuteEn={setPermuteEn}
            minusMark={minusMark}
            setMinusMark={setMinusMark}
            showResultsAfterCorrectionNotLoginUsers={
              showResultsAfterCorrectionNotLoginUsers
            }
            setShowResultsAfterCorrectionNotLoginUsers={
              setShowResultsAfterCorrectionNotLoginUsers
            }
            showResultsAfterCorrection={showResultsAfterCorrection}
            setShowResultsAfterCorrection={setShowResultsAfterCorrection}
          />
        }
      />
      <CommonWebBox
        header={translator.registryInfo}
        child={
          <QuizRegistryInfo
            start={startRegistry}
            end={endRegistry}
            setStart={setStartRegistry}
            setEnd={setEndRegistry}
            quizGeneralMode={props.quizGeneralMode}
            price={price}
            setPrice={setPrice}
            ranking={ranking}
            setRanking={setRanking}
            capacity={capacity}
            setCapacity={setCapacity}
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
        <CommonButton
          onPress={() => submit()}
          theme={'dark'}
          title={commonTranslator.confirmChanges}
        />
      </EqualTwoTextInputs>
    </MyView>
  );
};

export default CreateQuiz;
