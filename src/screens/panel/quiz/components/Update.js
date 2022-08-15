import React, {useState} from 'react';
import {View} from 'react-native';
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
import commonTranslator from '../../../../tranlates/Common';
import translator from '../Translator';
import {CallAPI} from './Create/CallAPI';
import {routes} from '../../../../API/APIRoutes';

const Update = props => {
  const quiz = props.quiz;

  const [name, setName] = useState(quiz.title);
  const [desc, setDesc] = useState('');
  const [kind, setKind] = useState(
    quiz.mode === 'regular' ? 'test' : 'tashrihi',
  ); //undefined
  const [tags, setTags] = useState([]);
  const [len, setLen] = useState('');
  const [lenMode, setLenMode] = useState('question');
  const [isOnline, setIsOnline] = useState(true); //undefined
  const [start, setStart] = useState(quiz.start);
  const [end, setEnd] = useState(quiz.end);
  const [price, setPrice] = useState(quiz.price);
  const [ranking, setRanking] = useState(quiz.topStudentsCount);
  const [capacity, setCapacity] = useState(quiz.capacity);
  const [backEn, setBackEn] = useState(undefined);
  const [permuteEn, setPermuteEn] = useState(undefined);
  const [showResultsAfterCorrection, setShowResultsAfterCorrection] =
    useState(true); //undefined
  const [minusMark, setMinusMark] = useState(undefined);

  const [startRegistry, setStartRegistry] = useState(quiz.startRegistry);
  const [endRegistry, setEndRegistry] = useState(quiz.endRegistry);

  const [descBefore, setDescBefore] = useState(undefined);
  const [descAfter, setDescAfter] = useState(undefined);

  const changeMode = newMode => {
    props.setMode(newMode);
  };

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
      isOnline: isOnline,
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
      routes.createQuiz + 'regular',
      props.token,
      props.setLoading,
      'regular',
    );

    if (result !== null) props.setMode('list');
  };

  React.useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  return (
    <MyView>
      <CommonWebBox
        header={translator.generalInfo}
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
            setIsOnline={setIsOnline}
            isOnline={isOnline}
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
          onPress={() => changeMode('list')}
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
