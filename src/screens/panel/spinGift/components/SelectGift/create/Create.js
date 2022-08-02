import {useState} from 'react';
import {View} from 'react-native-web';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import Translate from '../../../Translate';
import commonTranslate from '../../../../../../tranlates/Common';
import {
  typeGiftKeyVals,
  offCodeKeyVals,
  typeOffCodeKeyVals,
  siteAppKeyVals,
} from './keyVals';
import commonTranslator from '../../../../../../tranlates/Common';
import JustBottomBorderDatePicker from '../../../../../../styles/Common/JustBottomBorderDatePicker';
import {addGift, editGift} from '../../configGift/Utility';

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
      <View>
        <PhoneView style={{flexWrap: 'wrap', gap: 9}}>
          <JustBottomBorderSelect
            isHalf={true}
            placeholder={Translate.giftType}
            setter={setGiftType}
            value={typeGiftKeyVals.find(elem => {
              return elem.id === giftType;
            })}
            values={typeGiftKeyVals}
          />
          <JustBottomBorderTextInput
            justNum={true}
            isHalf={true}
            placeholder={Translate.amount}
            subText={commonTranslator.amount}
            onChangeText={text => setAmount(text)}
            value={amount}
            float={giftType === 'coin' ? true : undefined}
          />
          <JustBottomBorderTextInput
            justNum={true}
            isHalf={true}
            placeholder={commonTranslator.counter}
            subText={commonTranslator.counter}
            onChangeText={text => setCounter(text)}
            value={counter}
          />
          <JustBottomBorderTextInput
            justNum={true}
            isHalf={true}
            placeholder={commonTranslator.priority}
            subText={commonTranslator.priority}
            onChangeText={text => setPriority(text)}
            value={priority}
          />
          <JustBottomBorderTextInput
            float={true}
            justNum={true}
            isHalf={true}
            placeholder={commonTranslator.prob}
            subText={commonTranslator.prob}
            onChangeText={text => setProb(text)}
            value={prob}
          />
          <JustBottomBorderSelect
            justNum={true}
            isHalf={true}
            placeholder={commonTranslator.siteApp}
            subText={Translate.siteApp}
            setter={setSiteApp}
            value={siteAppKeyVals.find(elem => {
              return elem.id === siteApp;
            })}
            values={siteAppKeyVals}
          />
          {giftType === 'offcode' && (
            <JustBottomBorderSelect
              isHalf={true}
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
              isHalf={true}
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
              isHalf={true}
            />
          )}
        </PhoneView>
      </View>
      <View>
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
          title={commonTranslate.confirm}
        />
      </View>
    </CommonWebBox>
  );
}

export default Create;
