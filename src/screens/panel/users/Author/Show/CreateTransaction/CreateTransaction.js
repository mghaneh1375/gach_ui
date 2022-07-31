import {useState} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../../tranlates/Common';
import Translate from '../../Translator';

function CreateTransaction(props) {
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  return (
    <CommonWebBox
      header={commonTranslator.desc}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <View>
        <PhoneView>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={Translate.amount}
            value={amount}
            onChangeText={text => setAmount(text)}
          />
          <JustBottomBorderDatePicker
            isHalf={true}
            placeholder={commonTranslator.date}
            value={date}
            onChangeText={text => setDate(text)}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={commonTranslator.desc}
            value={description}
            subText={commonTranslator.notNecessary}
            onChangeText={text => setDescription(text)}
          />
        </PhoneView>
        <CommonButton title={commonTranslator.confirm} />
      </View>
    </CommonWebBox>
  );
}

export default CreateTransaction;
