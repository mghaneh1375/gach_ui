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
} from '../KeyVals';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {changeText} from '../../../../../services/Utility';
import {styleMarginRight25, styleMarginTop25} from '../Detail/style';
import RadioButtonYesOrNo from './../../../../../components/web/RadioButtonYesOrNo';
import {View} from 'react-native';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchUser from '../../../../../components/web/SearchUser/SearchUser';
import commonTranslator from '../../../../../tranlates/Common';
function Create(props) {
  const [showAddBatchPopUp, setShowAddBatchPopUp] = useState(false);
  const [showAddBatchFilesPopUp, setShowAddBatchFilesPopUp] = useState(false);
  const [type, setType] = useState();
  const [neededTime, setNeededTime] = useState();
  const [level, setLevel] = useState();
  const [author, setAuthor] = useState();
  const [visibility, setVisibility] = useState();
  const [answer, setAnswer] = useState();
  const [telorance, setTelorance] = useState();
  const [choicesCount, setChoicesCount] = useState();
  const [sentencesCount, setSentencesCount] = useState();
  const [sentencesAnswer, setSentencesAnswer] = useState();
  const [choices, setChoices] = useState();
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [foundUser, setFoundUser] = useState();
  const [err, setErr] = useState();

  React.useEffect(() => {
    if (choicesCount === undefined) return;

    let choicesTmp = [];
    for (let i = 0; i < choicesCount; i++) {
      choicesTmp.push({id: i + 1, item: 'گزینه ' + (i + 1)});
    }
    setChoices(choicesTmp);
  }, [choicesCount]);
  const send = async () => {
    if (props.isAdmin && (foundUser === undefined || foundUser.length === 0)) {
      setErr(commonTranslator.pleaseFillAllFields);
      return;
    }
  };
  const toggleShowAddBatchPopUp = () => {
    setShowAddBatchPopUp(!showAddBatchPopUp);
  };

  const toggleShowAddBatchFilesPopUp = () => {
    setShowAddBatchFilesPopUp(!showAddBatchFilesPopUp);
  };

  const toggleShowSearchUser = () => {
    setShowSearchUser(!showSearchUser);
  };

  return (
    <View>
      {props.isAdmin && (
        <SearchUser
          setFinalResult={setFoundUser}
          setShow={setShowSearchUser}
          token={props.token}
          setLoading={props.setLoading}
          show={showSearchUser}
        />
      )}
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
        <PhoneView style={{alignSelf: 'flex-end', marginBottom: 40}}>
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
        <PhoneView style={{flexWrap: 'wrap', ...styleMarginTop25}}>
          <JustBottomBorderSelect
            isHalf={true}
            style={{...styleMarginRight25, ...styleMarginTop25}}
            placeholder={translator.typeOfQuestion}
            setter={setType}
            values={typeOfQuestionKeyVals}
            value={typeOfQuestionKeyVals.find(elem => elem.id === type)}
          />
          <JustBottomBorderSelect
            isHalf={true}
            style={{...styleMarginRight25, ...styleMarginTop25}}
            placeholder={translator.visibility}
            setter={setVisibility}
            values={statusKeyVals}
            value={statusKeyVals.find(elem => elem.id === visibility)}
          />
          <JustBottomBorderSelect
            isHalf={true}
            style={{...styleMarginRight25, ...styleMarginTop25}}
            placeholder={translator.level}
            setter={setLevel}
            values={levelKeyVals}
            value={levelKeyVals.find(elem => elem.id === level)}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            style={{...styleMarginRight25, ...styleMarginTop25}}
            placeholder={translator.neededTime}
            value={neededTime}
            subText={'ثانیه'}
            justNum={true}
            onChangeText={e => changeText(e, setNeededTime)}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            style={{...styleMarginRight25, ...styleMarginTop25}}
            placeholder={translator.author}
            disable={true}
            value={
              foundUser !== undefined
                ? foundUser.map(elem => elem.name).join(',')
                : ''
            }
            onChangeText={e => changeText(e, setAuthor)}
          />
          <FontIcon
            kind={'normal'}
            theme={'rect'}
            back={'yellow'}
            icon={faPlus}
            onPress={() => toggleShowSearchUser()}
          />
          {type === 'short_answer' && (
            <JustBottomBorderTextInput
              isHalf={true}
              style={{...styleMarginRight25, ...styleMarginTop25}}
              placeholder={translator.answer}
              value={answer}
              justNum={true}
              onChangeText={e => changeText(e, setAnswer)}
            />
          )}
          {type === 'short_answer' && (
            <JustBottomBorderTextInput
              isHalf={true}
              style={{...styleMarginRight25, ...styleMarginTop25}}
              placeholder={translator.telorance}
              value={telorance}
              justNum={true}
              onChangeText={e => changeText(e, setTelorance)}
            />
          )}
          {type === 'test' && (
            <JustBottomBorderSelect
              isHalf={true}
              style={{
                ...styleMarginRight25,
                ...styleMarginTop25,
              }}
              placeholder={translator.choicesCount}
              setter={setChoicesCount}
              values={choicesCountKeyVals}
              value={choicesCountKeyVals.find(elem => elem.id === choicesCount)}
            />
          )}
          {type === 'test' && choices !== undefined && (
            <JustBottomBorderSelect
              isHalf={true}
              style={{
                ...styleMarginRight25,
                ...styleMarginTop25,
              }}
              placeholder={translator.answer}
              setter={setAnswer}
              values={choices}
              value={choices.find(elem => elem.id === answer)}
            />
          )}
          {type === 'multi_sentence' && (
            <JustBottomBorderTextInput
              isHalf={true}
              style={{...styleMarginRight25, ...styleMarginTop25}}
              justNum={true}
              placeholder={translator.sentencesCount}
              value={sentencesCount}
              onChangeText={e => {
                changeText(e, setSentencesCount);
                let arr = [];
                for (var i = 0; i < e; i++) arr.push('yes');

                setSentencesAnswer(arr);
              }}
            />
          )}
          <View>
            {type === 'multi_sentence' &&
              sentencesAnswer !== undefined &&
              sentencesAnswer.map((elem, index) => {
                console.log(elem);
                return (
                  <RadioButtonYesOrNo
                    label={'پاسخ گزاره ' + (index + 1)}
                    selected={elem}
                    setSelected={status => {
                      let tmp = sentencesAnswer;
                      tmp[index] = status;
                      setSentencesAnswer(tmp);
                    }}
                  />
                );
              })}
          </View>
          {type === 'tashrihi' && (
            <JustBottomBorderTextInput
              isHalf={true}
              style={{...styleMarginRight25, ...styleMarginTop25}}
              placeholder={translator.answer}
              value={answer}
              multiline={true}
              onChangeText={e => changeText(e, setAnswer)}
            />
          )}
        </PhoneView>
        <View></View>
      </CommonWebBox>
    </View>
  );
}

export default Create;
