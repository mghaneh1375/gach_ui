import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import Translate from '../../../Translate';
import commonTranslate from '../../../../../../translator/Common';
import {
  typeGiftKeyVals,
  offCodeKeyVals,
  typeOffCodeKeyVals,
  siteAppKeyVals,
} from './keyVals';
import commonTranslator from '../../../../../../translator/Common';
import JustBottomBorderDatePicker from '../../../../../../styles/Common/JustBottomBorderDatePicker';
import {addGift, editGift} from '../../configGift/Utility';
import {changeText} from '../../../../../../services/Utility';

function Create(props) {
  const [giftType, setGiftType] = useState(
    props.gift !== undefined ? props.gift.type : '',
  );
  const [counter, setCounter] = useState(
    props.gift !== undefined ? props.gift.count : '',
  );
  const [priority, setPriority] = useState(
    props.gift !== undefined ? props.gift.priority : '',
  );
  const [amount, setAmount] = useState(
    props.gift !== undefined ? props.gift.amount : '',
  );
  const [useFor, setUseFor] = useState(
    props.gift !== undefined ? props.gift.useFor : '',
  );
  const [typeOffCode, setTypeOffCode] = useState(
    props.gift !== undefined ? props.gift.offCodeType : '',
  );
  const [siteApp, setSiteApp] = useState(
    props.gift !== undefined ? (props.gift.isForSite ? 'site' : 'app') : '',
  );
  const [dateExpire, setDateExpire] = useState(
    props.gift !== undefined ? props.gift.expireAt : '',
  );
  const [prob, setProb] = useState(
    props.gift !== undefined ? props.gift.prob : '',
  );

  return (
    <CommonWebBox
      header={Translate.selectGift}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <MyView>
        <PhoneView style={{gap: 9}}>
          <JustBottomBorderSelect
            placeholder={Translate.giftType}
            subText={Translate.giftType}
            setter={setGiftType}
            value={typeGiftKeyVals.find(elem => {
              return elem.id === giftType;
            })}
            values={typeGiftKeyVals}
          />
          <JustBottomBorderTextInput
            justNum={true}
            placeholder={Translate.amount}
            subText={Translate.amount}
            onChangeText={text => changeText(text, setAmount)}
            value={amount}
            float={giftType === 'coin' ? true : undefined}
          />
          <JustBottomBorderTextInput
            justNum={true}
            placeholder={commonTranslator.counter}
            subText={commonTranslator.counter}
            onChangeText={text => changeText(text, setCounter)}
            value={counter}
          />
          <JustBottomBorderTextInput
            justNum={true}
            placeholder={commonTranslator.priority}
            subText={commonTranslator.priority}
            onChangeText={text => changeText(text, setPriority)}
            value={priority}
          />
          <JustBottomBorderTextInput
            float={true}
            justNum={true}
            placeholder={commonTranslator.prob}
            subText={commonTranslator.prob}
            onChangeText={text => changeText(text, setProb)}
            value={prob}
          />
          <JustBottomBorderSelect
            justNum={true}
            placeholder={Translate.siteApp}
            subText={Translate.siteApp}
            setter={setSiteApp}
            value={siteAppKeyVals.find(elem => {
              return elem.id === siteApp;
            })}
            values={siteAppKeyVals}
          />
          {giftType === 'offcode' && (
            <JustBottomBorderSelect
              placeholder={Translate.useItem}
              subText={Translate.useItem}
              setter={setUseFor}
              value={offCodeKeyVals.find(elem => {
                return elem.id === useFor;
              })}
              values={offCodeKeyVals}
            />
          )}
          {giftType === 'offcode' && (
            <JustBottomBorderSelect
              placeholder={Translate.typeOffCode}
              subText={Translate.typeOffCode}
              setter={setTypeOffCode}
              value={typeOffCodeKeyVals.find(elem => {
                return elem.id === typeOffCode;
              })}
              values={typeOffCodeKeyVals}
            />
          )}
          {giftType === 'offcode' && (
            <JustBottomBorderDatePicker
              placeholder={commonTranslate.dateExpire}
              subText={commonTranslate.dateExpire}
              setter={setDateExpire}
              value={dateExpire}
            />
          )}
        </PhoneView>
      </MyView>
      <MyView>
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let data = {
              type: giftType,
              amount: amount,
              count: counter,
              priority: priority,
              isForSite: siteApp === 'site',
              prob: prob,
            };
            if (giftType === 'offcode') {
              data.useFor = useFor;
              data.offCodeType = typeOffCode;
              data.expireAt = dateExpire;
            }
            let res =
              props.gift === undefined
                ? await addGift(data, props.token)
                : await editGift(props.gift.id, data, props.token);

            props.setLoading(false);
            if (res !== null) {
              if (props.gift === undefined) props.addItem(res);
              else {
                data.id = props.gift.id;
                props.update(data);
              }
              props.setMode('list');
            }
          }}
          title={commonTranslate.confrim}
        />
      </MyView>
    </CommonWebBox>
  );
}

export default Create;
