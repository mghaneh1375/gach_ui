import React, {useState} from 'react';
import {
  CommonRadioButton,
  PhoneView,
  MyView,
} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {launchModeKeyVals} from '../KeyVals';

const QuizRunInfo = props => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  React.useEffect(() => {
    setStart(props.start);
  }, [props.start]);

  React.useEffect(() => {
    setEnd(props.end);
  }, [props.end]);

  const trueFalseValues = [
    {item: commonTranslator.yes, id: true},
    {item: commonTranslator.no, id: false},
  ];

  const changeLen = val => {
    props.setLen(val);
  };

  const changeLenMode = newMode => {
    if (newMode === 'question') props.setLen('');
    props.setLenMode(newMode);
  };

  return (
    <MyView>
      <PhoneView>
        <CommonRadioButton
          value="question"
          status={props.lenMode === 'question' ? 'checked' : 'unchecked'}
          onPress={() => changeLenMode('question')}
          text={translator.questionBased}
        />
        <CommonRadioButton
          value="custom"
          status={props.lenMode === 'custom' ? 'checked' : 'unchecked'}
          onPress={() => changeLenMode('custom')}
          type={'textInput'}
          disable={props.lenMode !== 'custom'}
          justNum={true}
          text={translator.len}
          subText={translator.len}
          onChangeText={e => changeLen(e)}
          textValue={props.len}
        />
      </PhoneView>
      <PhoneView style={{gap: 10}}>
        <JustBottomBorderSelect
          isHalf={true}
          values={launchModeKeyVals}
          value={
            props.launchMode === undefined
              ? {}
              : launchModeKeyVals.filter(element => {
                  return element.id === props.launchMode;
                })[0]
          }
          setter={props.setLaunchMode}
          placeholder={translator.isOnline}
          subText={translator.isOnline}
        />
        <JustBottomBorderSelect
          isHalf={true}
          values={trueFalseValues}
          value={
            props.permute === undefined
              ? {}
              : trueFalseValues.filter(element => {
                  return element.id === props.permute;
                })[0]
          }
          setter={props.setPermuteEn}
          subText={translator.permute}
          placeholder={translator.permute}
        />
        <JustBottomBorderSelect
          isHalf={true}
          values={trueFalseValues}
          value={
            props.backEn === undefined
              ? {}
              : trueFalseValues.filter(element => {
                  return element.id === props.backEn;
                })[0]
          }
          setter={props.setBackEn}
          placeholder={translator.backEn}
          subText={translator.backEn}
        />

        <JustBottomBorderSelect
          isHalf={true}
          values={trueFalseValues}
          value={
            props.minusMark === undefined
              ? {}
              : trueFalseValues.filter(element => {
                  return element.id === props.minusMark;
                })[0]
          }
          setter={props.setMinusMark}
          subText={translator.minusMark}
          placeholder={translator.minusMark}
        />
        <JustBottomBorderSelect
          isHalf={true}
          values={trueFalseValues}
          value={
            props.showResultsAfterCorrection === undefined
              ? {}
              : trueFalseValues.filter(element => {
                  return element.id === props.showResultsAfterCorrection;
                })[0]
          }
          setter={props.setShowResultsAfterCorrection}
          subText={translator.showResultAfterCorrection}
          placeholder={translator.showResultAfterCorrection}
        />

        {start !== undefined && (
          <JustBottomBorderDatePicker
            placeholder={translator.startDate}
            value={start}
            setter={props.setStart}
            isHalf={true}
            subText={translator.startDate}
          />
        )}
        {end !== undefined && (
          <JustBottomBorderDatePicker
            placeholder={translator.endDate}
            value={end}
            setter={props.setEnd}
            isHalf={true}
            subText={translator.endDate}
          />
        )}
      </PhoneView>
    </MyView>
  );
};

export default QuizRunInfo;
