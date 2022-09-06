import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import ExcelComma from '../../../../components/web/ExcelCommaInput';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import translator from '../Translator';
import commonTranslator from '../../../../translator/Common';
import {
  typeKeyVals,
  mandatoryFields,
  withCodeKeyVals,
  sectionKeyVals,
  update,
} from './Utility';
import {changeText, trueFalseValues} from '../../../../services/Utility';
import {generalRequest} from '../../../../API/Utility';

const Create = props => {
  const [amount, setAmount] = useState(
    props.off !== undefined ? props.off.amount : '',
  );
  const [type, setType] = useState(
    props.off !== undefined ? props.off.type : '',
  );
  const [expireAt, setExpireAt] = useState(
    props.off !== undefined ? props.off.expireAtTs : '',
  );
  const [code, setCode] = useState(
    props.off !== undefined ? props.off.code : '',
  );
  const [additionalData, setAdditionalData] = useState({});
  const [isPublic, setIsPublic] = useState(
    props.off !== undefined ? props.off.isPublic : false,
  );
  const [withCode, setWithCode] = useState(
    props.off !== undefined
      ? props.off.code === undefined
        ? 'withoutCode'
        : 'withCode'
      : 'withoutCode',
  );
  const [section, setSection] = useState(
    props.off !== undefined ? props.off.section : 'all',
  );

  React.useEffect(() => {
    setAdditionalData({
      amount: amount,
      type: type,
      expireAt: expireAt,
      code: withCode ? code : undefined,
      isPublic: props.off === undefined ? isPublic : undefined,
      section: section,
    });
    if (isPublic) setWithCode('withCode');
  }, [amount, type, expireAt, code, isPublic, withCode, section, props.off]);

  const add = async () => {
    props.setLoading(true);
    if (props.off !== undefined) {
      let res = await update(
        routes.updateOff + props.off.id,
        additionalData,
        props.token,
      );
      props.setLoading(false);
      if (res !== null) {
        console.log(res);
        props.updateOff(res);
        props.setMode('list');
      }
      return;
    }
    try {
      let res = await generalRequest(
        routes.storeOffs,
        'put',
        additionalData,
        ['doneIds', 'excepts'],
        props.token,
        ['expireAt', 'type', 'amount', 'code', 'isPublic', 'section'],
      );
      props.setLoading(false);

      if (res !== null) {
        props.addOffs(res.doneIds);
        props.setMode('list');
      }
    } catch (e) {
      props.setLoading(false);
    }
  };

  return (
    <CommonWebBox
      header={
        props.addOffs !== undefined
          ? commonTranslator.add + ' ' + commonTranslator.offcode
          : commonTranslator.edit
      }
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{gap: 15}}>
        {props.off === undefined && (
          <JustBottomBorderSelect
            setter={setIsPublic}
            values={trueFalseValues}
            value={trueFalseValues.find(elem => elem.id === isPublic)}
            placeholder={translator.isPublic}
            subText={translator.isPublic}
          />
        )}

        <JustBottomBorderSelect
          placeholder={translator.type}
          subText={translator.type}
          setter={setType}
          values={typeKeyVals}
          value={typeKeyVals.find(elem => elem.id === type)}
        />
        <JustBottomBorderTextInput
          placeholder={translator.amount}
          subText={translator.amount}
          justNum={true}
          onChangeText={text => changeText(text, setAmount)}
          value={amount}
        />

        <JustBottomBorderSelect
          setter={setWithCode}
          values={withCodeKeyVals}
          value={withCodeKeyVals.find(elem => elem.id === withCode)}
          placeholder={translator.withOrWithOutCode}
          subText={translator.withOrWithOutCode}
        />
        <JustBottomBorderSelect
          setter={setSection}
          values={sectionKeyVals}
          value={sectionKeyVals.find(elem => elem.id === section)}
          placeholder={commonTranslator.section}
          subText={commonTranslator.section}
        />
        <JustBottomBorderDatePicker
          value={expireAt}
          setter={setExpireAt}
          placeholder={translator.expire}
          subText={translator.expire}
        />
        {withCode === 'withCode' && (
          <JustBottomBorderTextInput
            placeholder={translator.code}
            subText={translator.code}
            onChangeText={text => changeText(text, setCode)}
            value={code}
          />
        )}
      </PhoneView>
      {!isPublic && props.off === undefined && (
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
      )}
      {(isPublic || props.off !== undefined) && (
        <CommonButton
          theme={'dark'}
          title={commonTranslator.confirm}
          onPress={() => add()}
        />
      )}
    </CommonWebBox>
  );
};

export default Create;
