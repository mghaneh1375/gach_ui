import React, {useState} from 'react';
import {trueFalseValues} from '../../../../services/Utility';
import {CommonRadioButton, MyView, PhoneView} from '../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {launchModeKeyVals} from '../../../panel/quiz/components/KeyVals';
import translator from '../../../panel/quiz/Translator';

const QuizRunInfo = props => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  React.useEffect(() => {
    setStart(props.start);
  }, [props.start]);

  React.useEffect(() => {
    setEnd(props.end);
  }, [props.end]);

  const changeLen = val => {
    props.setLen(val);
  };

  const changeLenMode = newMode => {
    if (newMode === 'question') props.setLen('');
    props.setLenMode(newMode);
  };

  return (
    <MyView>
      {(props.isEnd === undefined || !props.isEnd) && (
        <PhoneView>
          <CommonRadioButton
            value="question"
            status={props.lenMode === 'question' ? 'checked' : 'unchecked'}
            onPress={() => {
              changeLenMode('question');
            }}
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
      )}

      <PhoneView style={{gap: 15}}>
        {(props.kind === undefined || props.kind !== 'tashrihi') &&
          (props.editMode === undefined || !props.editMode) && (
            <JustBottomBorderSelect
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
          )}
        <JustBottomBorderSelect
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
        {(props.editMode === undefined || !props.editMode) && (
          <JustBottomBorderSelect
            values={trueFalseValues}
            value={
              props.useFromDatabase === undefined
                ? {}
                : trueFalseValues.filter(element => {
                    return element.id === props.useFromDatabase;
                  })[0]
            }
            setter={props.setUseFromDatabase}
            subText={translator.useFromDatabase}
            placeholder={translator.useFromDatabase}
          />
        )}
        <JustBottomBorderSelect
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
        {start !== undefined &&
          (props.isStart === undefined || !props.isStart) && (
            <JustBottomBorderDatePicker
              placeholder={translator.startDate}
              value={start}
              setter={props.setStart}
              subText={translator.startDate}
            />
          )}
        {end !== undefined && (props.isEnd === undefined || !props.isEnd) && (
          <JustBottomBorderDatePicker
            placeholder={translator.endDate}
            value={end}
            setter={props.setEnd}
            subText={translator.endDate}
          />
        )}
      </PhoneView>
    </MyView>
  );
};

export default QuizRunInfo;
