import {View} from 'react-native';
import {PhoneView} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const QuizRegistryInfo = props => {
  const changeInput = (label, val) => {
    if (label === 'price') props.setPrice(val);
    else if (label === 'ranking') props.setRanking(val);
    else if (label === 'capacity') props.setCapacity(val);
  };

  return (
    <MyView>
      <PhoneView style={{gap: 10, flexWrap: 'wrap', marginBottom: 10}}>
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
      <PhoneView style={{gap: 10, flexWrap: 'wrap', marginBottom: 10}}>
        <JustBottomBorderDatePicker
          placeholder={translator.startRegistryDate}
          value={props.start}
          setter={props.setStart}
          isHalf={true}
        />
        <JustBottomBorderDatePicker
          placeholder={translator.endRegistryDate}
          value={props.end}
          setter={props.setEnd}
          isHalf={true}
        />
      </PhoneView>
    </MyView>
  );
};

export default QuizRegistryInfo;
