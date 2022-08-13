import React, {useState} from 'react';
import {
  BigBoldBlueText,
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
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
import {changeText, showError} from '../../../../../services/Utility';
import {styleGap10Wrap} from '../Detail/style';
import {View} from 'react-native';
import commonTranslator from '../../../../../tranlates/Common';
import MultiSentenceType from './MultiSentenceType';
import {
  addQuestion,
  editQuestion,
  getAuthorsKeyVals,
  getSubjectsKeyVals,
} from '../Utility';
import QuestionFile from './QuestionFile';
import {dispatchQuestionContext, questionContext} from '../Detail/Context';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [questionId, setQuestionId] = useState();

  React.useEffect(() => {
    if (props.isInEditMode && state.selectedQuestion !== undefined) {
      setNeededTime(state.selectedQuestion.neededTime);
      setType(state.selectedQuestion.kindQuestion);
      setAnswer(state.selectedQuestion.answer);
      setLevel(state.selectedQuestion.level);
      setVisibility(state.selectedQuestion.visibility);
      setOrganizationId(state.selectedQuestion.organizationId);

      setSubject(state.selectedQuestion.subject);
      setAuthor({
        id: state.selectedQuestion.author,
        name: state.selectedQuestion.author,
      });

      if (state.selectedQuestion.kindQuestion === 'test')
        setChoicesCount(state.selectedQuestion.choicesCount);
      else if (state.selectedQuestion.kindQuestion === 'short_answer')
        setTelorance(state.selectedQuestion.telorance);
      else {
        setSentencesCount(state.selectedQuestion.sentencesCount);
      }
    }
  }, [state.selectedQuestion, props.isInEditMode]);

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
    if (
      (props.isAdmin && author === undefined) ||
      subject === undefined ||
      (!props.isInEditMode && questionFile === undefined)
    ) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    let data = {
      level: level,
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

    if (props.isAdmin && author.id !== author.name) data.authorId = author.id;

    if (props.isInEditMode) data.subjectId = subject.id;

    props.setLoading(true);
    let res = props.isInEditMode
      ? await editQuestion(
          state.selectedQuestion.id,
          data,
          questionFile,
          answerFile,
          props.token,
        )
      : await addQuestion(
          subject.id,
          data,
          questionFile,
          answerFile,
          props.token,
        );
    props.setLoading(false);

    if (res !== null) {
      props.flushSubjectQuestionsInc(subject.id);

      if (
        props.isInEditMode &&
        state.selectedQuestion.subject.id !== subject.id
      ) {
        props.flushSubjectQuestionsInc(state.selectedQuestion.subject.id);
        dispatch({selectedQuestion: undefined});
        props.setMode('detail');
      } else props.setMode('list');
    }
  };

  return (
    <MyView>
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
            subText={translator.organizationCode}
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

          {props.isAdmin && (
            <JustBottomBorderTextInput
              style={{minWidth: 300}}
              placeholder={translator.author}
              subText={translator.author}
              resultPane={true}
              setSelectedItem={item => {
                setAuthor(item);
              }}
              values={state.authorsKeyVals}
              value={author !== undefined ? author.name : ''}
              reset={false}
            />
          )}
          {type === 'short_answer' && (
            <JustBottomBorderTextInput
              isHalf={true}
              placeholder={translator.answer}
              subText={translator.answer}
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
              subText={translator.telorance}
              value={telorance}
              justNum={true}
              onChangeText={e => changeText(e, setTelorance)}
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
              setAnswer={ans => {
                console.log(ans);
                setAnswer(ans);
              }}
              initAnswer={answer}
              initSentencesCount={sentencesCount}
            />
          )}

          {type === 'tashrihi' && (
            <JustBottomBorderSelect
              isHalf={true}
              placeholder={translator.neededLine}
              values={sentencesCountKeyVals}
              value={sentencesCountKeyVals.find(elem => {
                return elem.id == neededLine;
              })}
              setter={setNeededLine}
            />
          )}
          {type === 'tashrihi' && (
            <PhoneView style={{width: '100%'}}>
              <JustBottomBorderTextInput
                placeholder={translator.answer}
                value={answer}
                multiline={true}
                style={{minWidth: 400}}
                onChangeText={e => changeText(e, setAnswer)}
              />
            </PhoneView>
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

          {props.isInEditMode && state.selectedQuestion !== undefined && (
            <PhoneView style={{width: '100%'}}>
              <BigBoldBlueText text={'تصویر صورت سوال فعلی'} />
              <img width={'75%'} src={state.selectedQuestion.questionFile} />
            </PhoneView>
          )}

          {props.isInEditMode &&
            state.selectedQuestion !== undefined &&
            state.selectedQuestion.answerFile !== undefined && (
              <PhoneView style={{width: '100%'}}>
                <BigBoldBlueText text={'تصویرپاسخ تشریحی فعلی'} />
                <img width={'75%'} src={state.selectedQuestion.answerFile} />
              </PhoneView>
            )}
        </PhoneView>
        <CommonButton
          onPress={() => sendData()}
          title={commonTranslator.confirm}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default Create;
