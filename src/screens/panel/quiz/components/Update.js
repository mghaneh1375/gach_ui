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
import {quizContext, dispatchQuizContext} from './Context';

const Update = props => {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [kind, setKind] = useState('');
  const [tags, setTags] = useState([]);
  const [len, setLen] = useState('');
  const [lenMode, setLenMode] = useState('question');
  const [launchMode, setLaunchMode] = useState('');
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [price, setPrice] = useState('');
  const [ranking, setRanking] = useState('');
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

  // const [len, setLen] = useState('');
  // const [lenMode, setLenMode] = useState('question');
  // const [capacity, setCapacity] = useState(quiz.capacity);
  // const [backEn, setBackEn] = useState(undefined);
  // const [permuteEn, setPermuteEn] = useState(undefined);
  // const [minusMark, setMinusMark] = useState(undefined);
  // const [descBefore, setDescBefore] = useState(undefined);
  // const [descAfter, setDescAfter] = useState(undefined);

  const submit = async () => {
    const data = {
      title: name,
      description: desc,
      start: start,
      end: end,
      startRegistry: startRegistry,
      endRegistry: endRegistry,
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

    let result = await CallAPI(
      data,
      routes.editQuiz + state.selectedQuiz.id,
      props.token,
      props.setLoading,
      'regular',
    );

    if (result !== null) {
      data.id = state.selectedQuiz.id;
      dispatch({selectedQuiz: data, needUpdate: true});
      props.setMode('list');
    }
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

export default Update;
