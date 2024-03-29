import React, {useState} from 'react';
import {
  CommonRadioButton,
  PhoneView,
  MyView,
} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import {launchModeKeyVals} from '../KeyVals';
import {trueFalseValues} from '../../../../../services/Utility';

const QuizRunInfo = props => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [registrable, setRegistrable] = useState(props.isRigstrable);
  const [uploadable, setUploadable] = useState(props.isUploadable);
  const [QRNeeded, setQRNeeded] = useState(props.isQRNeeded);

  React.useEffect(() => {
    setStart(props.start);
  }, [props.start]);

  React.useEffect(() => {
    setEnd(props.end);
  }, [props.end]);

  const changeLen = val => {
    props.setLen(val);
  };

  React.useEffect(() => {
    if (props.kind === 'regularWithPDF') props.setLenMode('custom');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.kind]);

  const changeLenMode = newMode => {
    if (newMode === 'question') props.setLen('');
    props.setLenMode(newMode);
  };

  const changeIsRegistrable = newMode => {
    setRegistrable(newMode);
    if (!newMode) changeIsUploadable(false);
    props.setIsRigstrable(newMode);
  };

  const changeIsUploadable = newMode => {
    setUploadable(newMode);
    if (!newMode) changeIsQRNeeded(true);
    props.setIsUploadable(newMode);
  };

  const changeIsQRNeeded = newMode => {
    setQRNeeded(newMode);
    props.setIsQRNeeded(newMode);
  };

  return (
    <MyView>
      <PhoneView>
        {props.kind !== undefined && props.kind === 'tashrihi' && (
          <MyView>
            <CommonRadioButton
              value={true}
              status={registrable ? 'checked' : 'unchecked'}
              onPress={() => changeIsRegistrable(!registrable)}
              text={translator.isRegistrable}
            />

            {registrable && (
              <CommonRadioButton
                value={true}
                status={uploadable ? 'checked' : 'unchecked'}
                onPress={() => changeIsUploadable(!uploadable)}
                text={translator.isUploadable}
              />
            )}

            <CommonRadioButton
              value={true}
              status={
                !registrable || !uploadable
                  ? 'checked'
                  : QRNeeded
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => {
                if (registrable && uploadable) changeIsQRNeeded(!QRNeeded);
              }}
              text={translator.isQRNeeded}
            />
          </MyView>
        )}
        {registrable && uploadable && !QRNeeded && (
          <>
            {props.kind !== 'regularWithPDF' && (
              <CommonRadioButton
                value="question"
                status={props.lenMode === 'question' ? 'checked' : 'unchecked'}
                onPress={() => {
                  if (!QRNeeded) changeLenMode('question');
                }}
                text={translator.questionBased}
              />
            )}

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
          </>
        )}
      </PhoneView>
      {props.quizGeneralMode !== 'open' && props.quizGeneralMode !== 'content' && (
        <PhoneView style={{gap: 15}}>
          {(props.kind === undefined || props.kind !== 'tashrihi') &&
            props.setLaunchMode !== undefined && (
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

          {(props.kind === undefined ||
            (props.kind !== 'tashrihi' && props.kind !== 'regularWithPDF')) &&
            props.setPermuteEn !== undefined && (
              <JustBottomBorderSelect
                values={trueFalseValues}
                value={
                  props.permuteEn === undefined
                    ? {}
                    : trueFalseValues.filter(element => {
                        return element.id === props.permuteEn;
                      })[0]
                }
                setter={props.setPermuteEn}
                subText={translator.permute}
                placeholder={translator.permute}
              />
            )}
          {uploadable &&
            !QRNeeded &&
            props.kind !== 'regularWithPDF' &&
            props.setBackEn !== undefined && (
              <JustBottomBorderSelect
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
            )}

          {(props.kind === undefined || props.kind !== 'tashrihi') &&
            props.setMinusMark !== undefined && (
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
            )}
          {props.setShowResultsAfterCorrection !== undefined && (
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
          )}

          {props.setShowResultsAfterCorrectionNotLoginUsers !== undefined && (
            <JustBottomBorderSelect
              values={trueFalseValues}
              value={
                props.showResultsAfterCorrectionNotLoginUsers === undefined
                  ? {}
                  : trueFalseValues.filter(element => {
                      return (
                        element.id ===
                        props.showResultsAfterCorrectionNotLoginUsers
                      );
                    })[0]
              }
              setter={props.setShowResultsAfterCorrectionNotLoginUsers}
              subText={translator.showResultsAfterCorrectionNotLoginUsers}
              placeholder={translator.showResultsAfterCorrectionNotLoginUsers}
            />
          )}

          {start !== undefined && uploadable && (
            <JustBottomBorderDatePicker
              placeholder={translator.startDate}
              value={start}
              setter={props.setStart}
              subText={translator.startDate}
            />
          )}
          {end !== undefined && uploadable && (
            <JustBottomBorderDatePicker
              placeholder={translator.endDate}
              value={end}
              setter={props.setEnd}
              subText={translator.endDate}
            />
          )}
        </PhoneView>
      )}
      {(props.quizGeneralMode === 'open' ||
        props.quizGeneralMode === 'content') && (
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
      )}
    </MyView>
  );
};

export default QuizRunInfo;
