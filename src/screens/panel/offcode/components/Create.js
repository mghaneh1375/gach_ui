import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import ExcelComma from '../../../../components/web/ExcelCommaInput';
import {PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import translator from '../Translator';
import {Col} from 'react-grid-system';
import commonTranslator from '../../../../tranlates/Common';

const Create = props => {
  const [additionalData, setAdditionalData] = useState({
    amount: 1000,
    type: 'value',
    expireAt: '1657092720000',
  });

  const changeText = (label, text) => {
    let data = additionalData;
    data[label] = text;
    setAdditionalData(data);
  };

  const changeExpireAt = expireAt => {
    let data = additionalData;
    data['expireAt'] = expireAt * 1000;
    setAdditionalData(data);
  };

  const selectType = selectedItem => {
    let data = additionalData;
    console.log(selectedItem);
    data['type'] = selectedItem.id;
    setAdditionalData(data);
  };

  const typeKeyVals = [
    {item: translator.value, id: 'value'},
    {item: translator.percent, id: 'percent'},
  ];

  const back = () => {
    props.setMode('list');
  };

  return (
    <View>
      <ExcelComma
        header={translator.addOff}
        placeholder={commonTranslator.NIDs}
        help={commonTranslator.NIDHelp}
        setLoading={props.setLoading}
        token={props.token}
        url={routes.storeOffs}
        uploadUrl={routes.storeOffsWithExcel}
        afterAddingCallBack={props.addOffs}
        additionalData={additionalData}
        backFunc={back}
        mandatoryFields={['expireAt', 'type', 'amount']}
        preChild={
          <PhoneView style={{zIndex: 1, marginBottom: 10}}>
            <Col lg={6}>
              <PhoneView>
                <JustBottomBorderTextInput
                  isHalf={true}
                  placeholder={translator.amount}
                  justNum={true}
                  onChangeText={e => changeText('amount', e)}
                  // value={additionalData['amount']}
                />
                <JustBottomBorderSelect
                  isHalf={true}
                  placeholder={translator.type}
                  onSelect={selectType}
                  values={typeKeyVals}
                  value={
                    typeKeyVals.filter(element => {
                      console.log(element);
                      console.log(additionalData);
                      return element.id === additionalData['type'];
                    })[0]
                  }
                />
              </PhoneView>
            </Col>
            <Col lg={6}>
              <JustBottomBorderDatePicker
                value={additionalData['expireAt']}
                onChange={changeExpireAt}
                placeholder={translator.expire}
              />
            </Col>
          </PhoneView>
        }
      />
    </View>
  );
};

export default Create;
