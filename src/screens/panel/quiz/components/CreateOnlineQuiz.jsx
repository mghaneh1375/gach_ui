import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '@/styles';
import QuizAnswerSheetInfo from './create/QuizAnswerSheetInfo.jsx';
import QuizGeneralInfo from './create/QuizGeneralInfo.jsx';
import QuizRegistryInfo from './create/QuizRegistryInfo.jsx';
import commonTranslator from '@/translator/common.js';
import translator from '../translator';
import {CallAPI} from './create/callAPI';
import {routes} from '@/api/apiRoutes';
import {dispatchQuizContext, quizContext} from './Context.jsx';
import {addFile, getTags, removeFile} from './utility';
import {useFilePicker} from 'use-file-picker';
import {showSuccess} from '@/services/utility';
import JustBottomBorderDatePicker from '@/styles/common/JustBottomBorderDatePicker.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '@/styles/common/styles';
const CreateOnlineQuiz = props => {
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
    setPerTeam(state.selectedQuiz.perTeam);
    setMaxTeams(state.selectedQuiz.maxTeams);
    setPrice(state.selectedQuiz.price);
    setRanking(state.selectedQuiz.topStudentsCount);
    setStart(state.selectedQuiz.start);
    setDescAfter(state.selectedQuiz.descAfter);
    setDescBefore(state.selectedQuiz.descBefore);
    setEnd(state.selectedQuiz.end === undefined ? '' : state.selectedQuiz.end);
    setStartRegistry(state.selectedQuiz.startRegistry);
    setEndRegistry(state.selectedQuiz.endRegistry);
  }, [state.selectedQuiz, props.editMode, backToList]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState();
  const [start, setStart] = useState(props.editMode ? undefined : '');
  const [end, setEnd] = useState(props.editMode ? undefined : '');
  const [price, setPrice] = useState();
  const [ranking, setRanking] = useState();
  const [startRegistry, setStartRegistry] = useState(
    props.editMode ? undefined : '',
  );
  const [endRegistry, setEndRegistry] = useState(
    props.editMode ? undefined : '',
  );
  const [maxTeams, setMaxTeams] = useState();
  const [perTeam, setPerTeam] = useState();
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
    const res = await removeFile(props.token, filename, state.selectedQuiz.id);
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
    let data = {};
    data = {
      title: name,
      description: desc,
      start: start,
      end: end,
      startRegistry: startRegistry,
      tags: tags,
      price: price,
      priority: priority,
      topStudentsCount: ranking,
      descAfter: descAfter,
      desc: descBefore,
      perTeam: perTeam,
      maxTeams: maxTeams,
    };
    if (endRegistry !== undefined) data.endRegistry = endRegistry;
    props.setLoading(true);
    const result = await CallAPI(
      data,
      props.editMode
        ? routes.editQuiz + 'onlineStanding/' + state.selectedQuiz.id
        : routes.createQuiz + 'onlineStanding',
      props.token,
      'onlineStanding',
      undefined,
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
            'onlineStanding',
          );
          if (fileRes !== null && fileRes !== undefined) files.push(fileRes);
        }
        result.attaches = files;
        props.setLoading(false);
      } else {
        if (props.editMode) result.attaches = state.selectedQuiz.attaches;
        props.setLoading(false);
      }
      if (props.editMode) {
        dispatch({
          selectedQuiz: result,
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
            tags={tags}
            setTags={setTags}
            desc={desc}
            setDesc={setDesc}
            priority={priority}
            setPriority={setPriority}
          />
        }
      />
      <CommonWebBox header={translator.runInfo}>
        <PhoneView
          style={{
            ...styles.gap10,
          }}>
          {(!props.editMode || start !== undefined) && (
            <JustBottomBorderDatePicker
              placeholder={translator.startDate}
              value={start}
              setter={setStart}
              subText={translator.startDate}
            />
          )}
          {(!props.editMode || end !== undefined) && (
            <JustBottomBorderDatePicker
              placeholder={translator.endDate}
              value={end}
              setter={setEnd}
              subText={translator.endDate}
            />
          )}

          <JustBottomBorderTextInput
            placeholder={translator.maxTeams}
            subText={translator.maxTeams}
            value={maxTeams}
            onChangeText={e => setMaxTeams(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.perTeam}
            subText={translator.perTeam}
            value={perTeam}
            onChangeText={e => setPerTeam(e)}
            justNum={true}
          />
        </PhoneView>
      </CommonWebBox>

      <CommonWebBox
        header={translator.registryInfo}
        child={
          <QuizRegistryInfo
            start={startRegistry}
            end={endRegistry}
            setStart={setStartRegistry}
            setEnd={setEndRegistry}
            quizGeneralMode={'onlineStanding'}
            price={price}
            setPrice={setPrice}
            ranking={ranking}
            setRanking={setRanking}
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
export default CreateOnlineQuiz;
