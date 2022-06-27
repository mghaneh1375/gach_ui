import {View} from 'react-native';
import {PhoneView} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const QuizRegistryInfo = props => {
  const changeStart = unix_timestamp => {
    props.setStart(unix_timestamp * 1000);
  };

  const changeEnd = unix_timestamp => {
    props.setEnd(unix_timestamp * 1000);
  };

  const changeInput = (label, val) => {
    if (label === 'price') props.setPrice(val);
    else if (label === 'ranking') props.setRanking(val);
    else if (label === 'capacity') props.setCapacity(val);
  };

  return (
    <View>
      <PhoneView>
        <JustBottomBorderTextInput
          placeholder={translator.price}
          value={props.price}
          isHalf={true}
          onChangeText={e => changeInput('price', e)}
          justNum={true}
        />
        <JustBottomBorderTextInput
          placeholder={translator.ranking}
          isHalf={true}
          value={props.ranking}
          onChangeText={e => changeInput('ranking', e)}
          justNum={true}
        />
        <JustBottomBorderTextInput
          subText={commonTranslator.optional}
          placeholder={translator.capacity}
          isHalf={true}
          value={props.capacity}
          onChangeText={e => changeInput('capacity', e)}
          justNum={true}
        />
      </PhoneView>
      <PhoneView style={{marginTop: 10}}>
        <JustBottomBorderDatePicker
          placeholder={translator.startRegistryDate}
          value={props.start}
          onChange={changeStart}
          isHalf={true}
        />
        <JustBottomBorderDatePicker
          placeholder={translator.endRegistryDate}
          value={props.end}
          onChange={changeEnd}
          isHalf={true}
        />
      </PhoneView>
    </View>
  );
};

export default QuizRegistryInfo;
