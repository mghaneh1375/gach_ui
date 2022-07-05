import {Col} from 'react-grid-system';
import {View} from 'react-native';
import {CommonRadioButton, PhoneView} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const QuizRunInfo = props => {
  const runKindValues = [
    {item: translator.online, id: 'online'},
    {item: translator.offline, id: 'offline'},
  ];
  const trueFalseValues = [
    {item: commonTranslator.yes, id: true},
    {item: commonTranslator.no, id: false},
  ];

  const changeStart = unix_timestamp => {
    props.setStart(unix_timestamp * 1000);
  };

  const changeEnd = unix_timestamp => {
    props.setEnd(unix_timestamp * 1000);
  };

  const changeLen = val => {
    props.setLen(val);
  };

  const changeLenMode = newMode => {
    if (newMode === 'question') props.setLen('');
    props.setLenMode(newMode);
  };

  return (
    <View>
      <PhoneView>
        <Col lg={6}>
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
              onChangeText={e => changeLen(e)}
              textValue={props.len}
            />
          </PhoneView>
        </Col>
        <Col lg={6}>
          <PhoneView>
            <JustBottomBorderSelect
              isHalf={true}
              values={runKindValues}
              value={
                props.isOnline === undefined
                  ? {}
                  : runKindValues.filter(element => {
                      return element.id === props.isOnline;
                    })[0]
              }
              setter={props.setIsOnline}
              placeholder={translator.isOnline}
              subText={commonTranslator.necessaryField}
            />
          </PhoneView>
        </Col>
      </PhoneView>
      <PhoneView style={{marginTop: 20}}>
        <Col lg={12}>
          <PhoneView>
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
              subText={commonTranslator.optionalFalseDefault}
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
              subText={commonTranslator.optionalTrueDefault}
              placeholder={translator.backEn}
            />
          </PhoneView>
        </Col>
      </PhoneView>

      <PhoneView style={{marginTop: 20}}>
        <Col lg={12}>
          <PhoneView>
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
              subText={commonTranslator.optionalTrueDefault}
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
              subText={commonTranslator.necessaryField}
              placeholder={translator.showResultAfterCorrection}
            />
          </PhoneView>
        </Col>
      </PhoneView>

      <PhoneView style={{marginTop: 10}}>
        <JustBottomBorderDatePicker
          placeholder={translator.startDate}
          value={props.start}
          onChange={changeStart}
          isHalf={true}
        />
        <JustBottomBorderDatePicker
          placeholder={translator.endDate}
          value={props.end}
          onChange={changeEnd}
          isHalf={true}
        />
      </PhoneView>
    </View>
  );
};

export default QuizRunInfo;
