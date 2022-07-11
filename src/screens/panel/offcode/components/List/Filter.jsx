import {useState} from 'react';
import {CommonButton, PhoneView} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {allTypeKeyVals, filter, typeKeyVals, usedKeyVals} from '../Utility';

const Filter = props => {
  const [used, setUsed] = useState();
  const [type, setType] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [expiredAt, setExpiredAt] = useState();
  const [createdAtEndLimit, setCreatedAtEndLimit] = useState();
  const [expiredAtEndLimit, setExpiredAtEndLimit] = useState();

  return (
    <PhoneView>
      <JustBottomBorderSelect
        isHalf={true}
        setter={setUsed}
        values={usedKeyVals}
        value={usedKeyVals.find(elem => elem.id === used)}
        placeholder={translator.usedAndNotUsed}
      />
      <JustBottomBorderSelect
        isHalf={true}
        setter={setType}
        values={allTypeKeyVals}
        value={allTypeKeyVals.find(elem => elem.id === type)}
        placeholder={translator.type}
      />
      <CommonButton
        onPress={() =>
          filter(
            props,
            used,
            type,
            createdAt,
            createdAtEndLimit,
            expiredAt,
            expiredAtEndLimit,
          )
        }
        isHalf={true}
        title={commonTranslator.show}
        style={{alignSelf: 'flex-start'}}
      />
    </PhoneView>
  );
};

export default Filter;
