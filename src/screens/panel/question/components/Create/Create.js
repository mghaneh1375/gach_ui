import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import AddBatch from './AddBatch';
import AddBatchFiles from './AddBatchFiles';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {
  typeOfQuestionKeyVals,
  levelKeyVals,
  statusKeyVals,
  choicesCountKeyVals,
  sentencesCountKeyVals,
} from '../KeyVals';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {changeText} from '../../../../../services/Utility';
import {styleGap10Wrap} from '../Detail/style';
import {View} from 'react-native';
import commonTranslator from '../../../../../tranlates/Common';
import MultiSentenceType from './MultiSentenceType';
import {addQuestion, getAuthorsKeyVals, getSubjectsKeyVals} from '../Utility';
import QuestionFile from './QuestionFile';
import {dispatchQuestionContext, questionContext} from '../Detail/Context';

function Create(props) {
  const [showAddBatchPopUp, setShowAddBatchPopUp] = useState(false);
  const [showAddBatchFilesPopUp, setShowAddBatchFilesPopUp] = useState(false);
  const [type, setType] = useState();
  const [neededTime, setNeededTime] = useState();
  const [neededLine, setNeededLine] = useState();
  const [level, setLevel] = useState();
  const [author, setAuthor] = useState();
  const [visibility, setVisibility] = useState();
  const [answer, setAnswer] = useState();
  const [telorance, setTelorance] = useState();
  const [choicesCount, setChoicesCount] = useState();
  const [sentencesCount, setSentencesCount] = useState();
  const [subject, setSubject] = useState();
  const [choices, setChoices] = useState();
  const [organizationId, setOrganizationId] = useState();

  const [questionFile, setQuestionFile] = useState();
  const [answerFile, setAnswerFile] = useState();

  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState();

  React.useEffect(() => {
    if (isWorking || state.authorsKeyVals !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      getAuthorsKeyVals(props.token),
      getSubjectsKeyVals(props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null || res[1] === null) {
        props.setMode('list');
        return;
      }

      dispatch({authorsKeyVals: res[0], subjectsKeyVals: res[1]});
      setIsWorking(false);
    });
  }, [props, state, isWorking, dispatch]);

  React.useEffect(() => {
    if (choicesCount === undefined) return;

    let choicesTmp = [];
    for (let i = 0; i < choicesCount; i++) {
      choicesTmp.push({id: i + 1, item: 'گزینه ' + (i + 1)});
    }
    setChoices(choicesTmp);
  }, [choicesCount]);

  const toggleShowAddBatchPopUp = () => {
    setShowAddBatchPopUp(!showAddBatchPopUp);
  };

  const toggleShowAddBatchFilesPopUp = () => {
    setShowAddBatchFilesPopUp(!showAddBatchFilesPopUp);
  };

  const sendData = async () => {
    let data = {
      level: level,
      authorId: author.id,
      neededTime: neededTime,
      answer: answer,
      organizationId: organizationId,
      kindQuestion: type,
      visibility: visibility,
    };

    if (type === 'tashrihi') data.neededLine = neededLine;
    else if (type === 'short_answer') data.telorance = telorance;
    else if (type === 'multi_sentence') data.sentencesCount = sentencesCount;
    else if (type === 'test') data.choicesCount = choicesCount;

    props.setLoading(true);
    await addQuestion(subject.id, data, questionFile, answerFile, props.token);
    props.setLoading(false);
  };

  return (
    <View>
      <CommonWebBox
        onBackClick={() => props.setMode('list')}
        header={translator.addQuestions}
        backBtn={true}>
        {showAddBatchPopUp && (
          <AddBatch
            toggleShowPopUp={toggleShowAddBatchPopUp}
            token={props.token}
            setLoading={props.setLoading}
            setMode={props.setMode}
          />
        )}
        {showAddBatchFilesPopUp && (
          <AddBatchFiles
            toggleShowPopUp={toggleShowAddBatchFilesPopUp}
            token={props.token}
            setLoading={props.setLoading}
          />
        )}
        <PhoneView style={{...styleGap10Wrap}}>
          <CommonButton
            onPress={() => toggleShowAddBatchPopUp()}
            theme={'dark'}
            title={translator.uploadExcelFile}
          />
          <CommonButton
            onPress={() => toggleShowAddBatchFilesPopUp()}
            theme={'dark'}
            title={translator.uploadZipFile}
          />
        </PhoneView>
        <PhoneView style={{flexWrap: 'wrap', gap: 10}}>
          <JustBottomBorderSelect
            isHalf={true}
            placeholder={translator.typeOfQuestion}
            setter={setType}
            values={typeOfQuestionKeyVals}
            value={typeOfQuestionKeyVals.find(elem => elem.id === type)}
          />

          <JustBottomBorderTextInput
            style={{minWidth: 300}}
            placeholder={commonTranslator.subject}
            resultPane={true}
            setSelectedItem={item => {
              setSubject(item);
            }}
            values={state.subjectsKeyVals}
            value={subject !== undefined ? subject.name : ''}
            reset={false}
          />

          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={translator.organizationCode}
            value={organizationId}
            onChangeText={e => changeText(e, setOrganizationId)}
          />

          <JustBottomBorderSelect
            isHalf={true}
            placeholder={translator.visibility}
            setter={setVisibility}
            values={statusKeyVals}
            value={statusKeyVals.find(elem => elem.id === visibility)}
          />
          <JustBottomBorderSelect
            isHalf={true}
            placeholder={translator.level}
            setter={setLevel}
            values={levelKeyVals}
            value={levelKeyVals.find(elem => elem.id === level)}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={translator.neededTime}
            value={neededTime}
            subText={'ثانیه'}
            justNum={true}
            onChangeText={e => changeText(e, setNeededTime)}
          />
          {type === 'short_answer' && (
            <JustBottomBorderTextInput
              isHalf={true}
              placeholder={translator.answer}
              value={answer}
              justNum={true}
              float={true}
              onChangeText={e => changeText(e, setAnswer)}
            />
          )}
          {type === 'short_answer' && (
            <JustBottomBorderTextInput
              isHalf={true}
              float={true}
              placeholder={translator.telorance}
              value={telorance}
              justNum={true}
              onChangeText={e => changeText(e, setTelorance)}
            />
          )}

          {props.isAdmin && (
            <JustBottomBorderTextInput
              style={{minWidth: 300}}
              placeholder={translator.author}
              resultPane={true}
              setSelectedItem={item => {
                setAuthor(item);
              }}
              values={state.authorsKeyVals}
              value={author !== undefined ? author.name : ''}
              reset={false}
            />
          )}

          {type === 'test' && (
            <JustBottomBorderSelect
              isHalf={true}
              placeholder={translator.choicesCount}
              setter={setChoicesCount}
              values={choicesCountKeyVals}
              value={choicesCountKeyVals.find(elem => elem.id === choicesCount)}
            />
          )}

          {type === 'test' && choices !== undefined && (
            <JustBottomBorderSelect
              isHalf={true}
              placeholder={translator.answer}
              setter={setAnswer}
              values={choices}
              value={choices.find(elem => elem.id === answer)}
            />
          )}
          {type === 'multi_sentence' && (
            <MultiSentenceType
              updateSentencesCount={item => {
                setSentencesCount(item);
              }}
            />
          )}

          {type === 'tashrihi' && (
            <View style={{width: '100%'}}>
              <PhoneView>
                <JustBottomBorderTextInput
                  placeholder={translator.answer}
                  value={answer}
                  multiline={true}
                  onChangeText={e => changeText(e, setAnswer)}
                />
                <JustBottomBorderSelect
                  placeholder={translator.neededLines}
                  values={sentencesCountKeyVals}
                  value={sentencesCountKeyVals.find(elem => {
                    return elem.id == neededLine;
                  })}
                  setter={setNeededLine}
                />
              </PhoneView>
            </View>
          )}

          <PhoneView style={{width: '100%'}}>
            <QuestionFile
              setFile={setQuestionFile}
              label={translator.questionFile}
            />
            <QuestionFile
              setFile={setAnswerFile}
              label={translator.answerFile}
            />
          </PhoneView>
        </PhoneView>
        <CommonButton
          onPress={() => sendData()}
          title={commonTranslator.confirm}
        />
      </CommonWebBox>
    </View>
  );
}

export default Create;
