import {useState} from 'react';
import {View} from 'react-native';
import {convertTimestamp} from '../../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../../tranlates/Common';
import {createTransaction} from '../../List/Utility';
import Translate from '../../Translator';

function CreateTransaction(props) {
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  return (
    <CommonWebBox
      header={commonTranslator.desc}
      backBtn={true}
      onBackClick={() => props.setMode('show')}>
      <MyView>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={Translate.amount}
            value={amount}
            isHalf={true}
            justNum={true}
            onChangeText={text => setAmount(text)}
          />
          <JustBottomBorderDatePicker
            placeholder={commonTranslator.date}
            value={date}
            isHalf={true}
            setter={setDate}
          />
          <JustBottomBorderTextInput
            placeholder={commonTranslator.desc}
            value={description}
            isHalf={true}
            subText={commonTranslator.notNecessary}
            onChangeText={text => setDescription(text)}
          />
        </PhoneView>
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let data = {
              pay: amount,
              payAt: date,
              description: description,
            };
            let res = await createTransaction(
              props.author.id,
              data,
              props.token,
            );
            props.setLoading(false);
            if (res !== null) {
              data.id = res.id;
              data.payAt = convertTimestamp(data.payAt);
              props.author.transactions.push(data);
              props.author.sumPayment = res.sumPayment;
              props.author.lastTransaction = res.lastTransaction;
              props.updateAuthor(props.author);
              props.setMode('show');
            }
          }}
          title={commonTranslator.confirm}
        />
      </MyView>
    </CommonWebBox>
  );
}

export default CreateTransaction;
