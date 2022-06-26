import {useState} from 'react';
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

const CreateQuiz = props => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [kind, setKind] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [len, setLen] = useState('');
  const [lenMode, setLenMode] = useState('question');
  const [isOnline, setIsOnline] = useState(undefined);
  const [start, setStart] = useState('');
  const [price, setPrice] = useState('');
  const [ranking, setRanking] = useState('');
  const [capacity, setCapacity] = useState('');
  const [end, setEnd] = useState('');
  const [startRegistry, setStartRegistry] = useState('');
  const [endRegistry, setEndRegistry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  return (
    <View>
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
        child={<QuizAnswerSheetInfo setLoading={props.setLoading} />}
      />
      <EqualTwoTextInputs>
        <CommonButton
          onPress={() => changeMode('show')}
          title={commonTranslator.cancel}
        />
        <CommonButton theme={'dark'} title={commonTranslator.confirmChanges} />
      </EqualTwoTextInputs>
    </View>
  );
};

export default CreateQuiz;
