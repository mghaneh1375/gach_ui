import {useState} from 'react';
import {CommonButton, PhoneView, MyView} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {allTypeKeyVals, filter, usedKeyVals, withCodeKeyVals} from '../Utility';

const Filter = props => {
  const [used, setUsed] = useState();
  const [type, setType] = useState();
  const [withCode, setWithCode] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [expiredAt, setExpiredAt] = useState();
  const [createdAtEndLimit, setCreatedAtEndLimit] = useState();
  const [expiredAtEndLimit, setExpiredAtEndLimit] = useState();

  return (
    <PhoneView style={{gap: 15}}>
      <JustBottomBorderSelect
        setter={setUsed}
        values={usedKeyVals}
        value={usedKeyVals.find(elem => elem.id === used)}
        placeholder={translator.usedAndNotUsed}
        subText={translator.used}
      />
      <JustBottomBorderSelect
        setter={setType}
        values={allTypeKeyVals}
        value={allTypeKeyVals.find(elem => elem.id === type)}
        placeholder={translator.type}
        subText={translator.type}
      />
      <JustBottomBorderSelect
        setter={setWithCode}
        values={withCodeKeyVals}
        value={withCodeKeyVals.find(elem => elem.id === withCode)}
        placeholder={translator.withOrWithOutCode}
        subText={translator.withOrWithOutCode}
      />
      <CommonButton
        onPress={() =>
          filter(
            props,
            used,
            type,
            withCode,
            createdAt,
            createdAtEndLimit,
            expiredAt,
            expiredAtEndLimit,
          )
        }
        title={commonTranslator.show}
        style={{alignSelf: 'flex-start'}}
      />
    </PhoneView>
  );
};

export default Filter;
