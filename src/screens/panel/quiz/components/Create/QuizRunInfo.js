import {Col} from 'react-grid-system';
import {View} from 'react-native';
import {
  CommonRadioButton,
  EqualTwoTextInputs,
  PhoneView,
} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';

const QuizRunInfo = props => {
  const runKindValues = [
    {name: translator.online, id: 'online'},
    {name: translator.offline, id: 'offline'},
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

  const selectRunKind = (item_key, item_idx) => {
    props.setIsOnline(runKindValues[item_idx].id);
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
                  ? ''
                  : props.isOnline === 'online'
                  ? 'آنلاین'
                  : 'حضوری'
              }
              onSelect={selectRunKind}
              placeholder={translator.isOnline}
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
