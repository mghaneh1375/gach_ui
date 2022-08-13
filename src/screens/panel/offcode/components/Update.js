import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import {View} from 'react-native';
import {backToList, changeText, update, typeKeyVals} from './Utility';
import {routes} from '../../../../API/APIRoutes';
import {
  convertTimestamp,
  simpleConvertTimestamp,
} from '../../../../services/Utility';

const Update = props => {
  const [amount, setAmount] = useState(props.off.amount);
  const [type, setType] = useState(props.off.type);
  const [expireAt, setExpireAt] = useState(props.off.expireAtTs);

  return (
    <CommonWebBox
      header={translator.editOff}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <MyView>
        <PhoneView style={{zIndex: 1, marginBottom: 10}}>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={translator.amount}
            justNum={true}
            onChangeText={e => changeText('amount', e, setAmount)}
            value={amount}
          />
          <JustBottomBorderSelect
            isHalf={true}
            placeholder={translator.type}
            setter={setType}
            values={typeKeyVals}
            value={typeKeyVals.find(elem => elem.id === type)}
          />
          <JustBottomBorderDatePicker
            value={expireAt}
            setter={setExpireAt}
            placeholder={translator.expire}
          />
        </PhoneView>
        <CommonButton
          title={commonTranslator.update}
          theme={'dark'}
          onPress={() =>
            update(
              routes.updateOff + props.off.id,
              {
                amount: amount,
                type: type,
                expireAt: expireAt,
              },
              props.setLoading,
              props.token,
              res => {
                if (res !== null) {
                  props.off.amount = amount;
                  props.off.type = type;
                  props.off.expireAtTs = expireAt;
                  props.off.expireAt = simpleConvertTimestamp(expireAt);
                  props.updateOff(props.off);
                  backToList(props.setMode);
                }
              },
            )
          }
        />
      </MyView>
    </CommonWebBox>
  );
};

export default Update;
