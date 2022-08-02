import {useState} from 'react';
import {View} from 'react-native-web';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
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
import {addGift} from '../../configGift/Utility';

function Create(props) {
  const [typeGift, setTypeGift] = useState();
  const [howMany, setHowMany] = useState();
  const [priority, setPriority] = useState();
  const [valueGift, setValueGift] = useState();
  const [offcode, setOffCode] = useState();
  const [typeOffCode, setTypeOffCode] = useState();
  const [siteApp, setSiteApp] = useState();
  const [dateExpire, setDateExpire] = useState();
  const [prob, setProb] = useState();

  return (
    <CommonWebBox
      header={Translate.selectGift}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <View>
        <PhoneView style={{flexWrap: 'wrap', gap: 9}}>
          <JustBottomBorderSelect
            isHalf={true}
            placeholder={Translate.typeGift}
            setter={setTypeGift}
            value={typeGiftKeyVals.find(elem => {
              return elem.id === typeGift;
            })}
            values={typeGiftKeyVals}
          />
          <JustBottomBorderTextInput
            justNum={true}
            isHalf={true}
            placeholder={Translate.valueGift}
            subText={commonTranslator.valueGift}
            onChangeText={text => setValueGift(text)}
            value={valueGift}
          />
          <JustBottomBorderTextInput
            justNum={true}
            isHalf={true}
            placeholder={commonTranslator.howMany}
            subText={commonTranslator.howMany}
            onChangeText={text => setHowMany(text)}
            value={howMany}
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
          {typeGift === 'offcode' && (
            <JustBottomBorderSelect
              isHalf={true}
              placeholder={Translate.useItem}
              subText={Translate.useItem}
              setter={setOffCode}
              value={offCodeKeyVals.find(elem => {
                return elem.id === offcode;
              })}
              values={offCodeKeyVals}
            />
          )}
          {typeGift === 'offcode' && (
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
          {typeGift === 'offcode' && (
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
              type: typeGift,
              amount: valueGift,
              count: howMany,
              priority: priority,
              isForSite: siteApp === 'site',
              prob: prob,
            };
            if (typeGift === 'offcode') {
              data.useFor = offcode;
              data.offCodeType = typeOffCode;
              data.expireAt = dateExpire;
            }
            let res = await addGift(data, props.token);
            props.setLoading(false);
            if (res !== null) {
              props.addItem(res);
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