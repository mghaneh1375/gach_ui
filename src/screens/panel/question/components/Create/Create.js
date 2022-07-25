import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import AddBatch from './AddBatch';
import AddBatchFiles from './AddBatchFiles';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {typeOfQuestionKeyVals, levelKeyVals, statusKeyVals} from '../KeyVals';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {CommonTextInput} from '../../../../../styles/Common/CommonTextInput';
import {changeText} from '../../../../../services/Utility';
import {styleMarginRight25, styleMarginTop25} from '../Detail/style';
import RadioButtonYesOrNo from './../../../../../components/web/RadioButtonYesOrNo';

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

  const toggleShowAddBatchPopUp = () => {
    setShowAddBatchPopUp(!showAddBatchPopUp);
  };

  const toggleShowAddBatchFilesPopUp = () => {
    setShowAddBatchFilesPopUp(!showAddBatchFilesPopUp);
  };

  return (
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
      <PhoneView style={{alignSelf: 'flex-end'}}>
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
          justNum={true}
          onChangeText={e => changeText(e, setNeededTime)}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          style={{...styleMarginRight25, ...styleMarginTop25}}
          placeholder={translator.author}
          value={author}
          onChangeText={e => changeText(e, setAuthor)}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          style={{...styleMarginRight25, ...styleMarginTop25}}
          placeholder={translator.answer}
          value={answer}
          justNum={true}
          onChangeText={e => changeText(e, setAnswer)}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          style={{...styleMarginRight25, ...styleMarginTop25}}
          placeholder={translator.telorance}
          value={telorance}
          justNum={true}
          onChangeText={e => changeText(e, setTelorance)}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          style={{...styleMarginRight25, ...styleMarginTop25}}
          placeholder={translator.choicesCount}
          value={choicesCount}
          justNum={true}
          onChangeText={e => changeText(e, setChoicesCount)}
        />
      </PhoneView>
      <PhoneView>
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
      </PhoneView>
    </CommonWebBox>
  );
}

export default Create;
