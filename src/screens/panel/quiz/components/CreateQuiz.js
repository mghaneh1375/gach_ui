import React, {useState} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
} from '../../../../styles/Common';
import QuizAnswerSheetInfo from './Create/QuizAnswerSheetInfo';
import QuizGeneralInfo from './Create/QuizGeneralInfo';
import QuizRegistryInfo from './Create/QuizRegistryInfo';
import QuizRunInfo from './Create/QuizRunInfo';
import commonTranslator from '../../../../tranlates/Common';
import translator from '../Translator';
import {CallAPI} from './Create/CallAPI';
import {routes} from '../../../../API/APIRoutes';
import {dispatchQuizContext, quizContext} from './Context';
import {getTags} from './Utility';

const CreateQuiz = props => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [kind, setKind] = useState();
  const [tags, setTags] = useState([]);
  const [len, setLen] = useState('');
  const [lenMode, setLenMode] = useState('question');
  const [launchMode, setLaunchMode] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [price, setPrice] = useState();
  const [ranking, setRanking] = useState();
  const [capacity, setCapacity] = useState();
  const [backEn, setBackEn] = useState(undefined);
  const [permuteEn, setPermuteEn] = useState(undefined);
  const [showResultsAfterCorrection, setShowResultsAfterCorrection] =
    useState(true); //undefined
  const [minusMark, setMinusMark] = useState(undefined);

  const [startRegistry, setStartRegistry] = useState();
  const [endRegistry, setEndRegistry] = useState();

  const [descBefore, setDescBefore] = useState(undefined);
  const [descAfter, setDescAfter] = useState(undefined);

  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);

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
      topStudentsCount: ranking,
      descAfter: descAfter,
      desc: descBefore,
    };
    if (endRegistry !== undefined) data.endRegistry = endRegistry;

    let result = await CallAPI(
      data,
      routes.createQuiz + 'regular',
      props.token,
      props.setLoading,
      'regular',
    );

    if (result !== null) {
      let allQuizzes = state.quizzes;
      allQuizzes.push(result);
      dispatch({quizzes: allQuizzes});
      props.setMode('list');
    }
  };

  return (
    <View>
      <CommonWebBox
        header={translator.generalInfo}
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        onback
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
        style={{zIndex: 10}}
        child={
          <QuizRunInfo
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
            showResultsAfterCorrection={showResultsAfterCorrection}
            setShowResultsAfterCorrection={setShowResultsAfterCorrection}
          />
        }
      />
      <CommonWebBox
        header={translator.registryInfo}
        style={{zIndex: 5}}
        child={
          <QuizRegistryInfo
            start={startRegistry}
            end={endRegistry}
            setStart={setStartRegistry}
            setEnd={setEndRegistry}
            price={price}
            setPrice={setPrice}
            ranking={ranking}
            setRanking={setRanking}
            capacity={capacity}
            setCapacity={setCapacity}
            // startTime={startTime}
            // endTime={endTime}
            // setStartDate={setStartDate}
            // setEndDate={setEndDate}
            // setStartTime={setStartTime}
            // setEndTime={setEndTime}
          />
        }
      />
      <CommonWebBox
        header={translator.answerSheetInfo}
        style={{zIndex: 4}}
        child={
          <QuizAnswerSheetInfo
            descBefore={descBefore}
            setDescBefore={setDescBefore}
            descAfter={descAfter}
            setDescAfter={setDescAfter}
            setLoading={props.setLoading}
            token={props.token}
            navigator={props.navigator}
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
    </View>
  );
};

export default CreateQuiz;
