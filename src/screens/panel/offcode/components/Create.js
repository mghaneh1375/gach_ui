import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import ExcelComma from '../../../../components/web/ExcelCommaInput';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import {changeText, update, typeKeyVals, mandatoryFields} from './Utility';

const Create = props => {
  const [amount, setAmount] = useState(1000000);
  const [type, setType] = useState('value');
  const [expireAt, setExpireAt] = useState('1657092720000');
  const [additionalData, setAdditionalData] = useState({});

  React.useEffect(() => {
    setAdditionalData({
      amount: amount,
      type: type,
      expireAt: expireAt,
    });
  }, [amount, type, expireAt]);

  return (
    <CommonWebBox
      header={translator.addOff}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{zIndex: 1, gap: 10, marginBottom: 10}}>
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
      <ExcelComma
        placeholder={commonTranslator.NIDs}
        help={commonTranslator.NIDHelp}
        setLoading={props.setLoading}
        token={props.token}
        url={routes.storeOffs}
        uploadUrl={routes.storeOffsWithExcel}
        afterAddingCallBack={props.addOffs}
        additionalData={additionalData}
        mandatoryFields={mandatoryFields}
      />
    </CommonWebBox>
  );
};

export default Create;
