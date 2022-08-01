import {useState} from 'react';
import {View} from 'react-native-web';
import {CommonWebBox, PhoneView} from '../../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import Translate from '../../../Translate';
import commonTranslate from '../../../../../../tranlates/Common';
import {typeGiftKeyVals} from './keyVals';
import commonTranslator from '../../../../../../tranlates/Common';

function Create(props) {
  const [typeGift, setTypeGift] = useState();
  const [howMany, setHowMany] = useState();
  return (
    <CommonWebBox
      header={Translate.newAuthor}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <View>
        <PhoneView>
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
            placeholder={commonTranslator.howMany}
            subText={commonTranslator.howMany}
            onChangeText={text => setHowMany(text)}
          />
        </PhoneView>
      </View>
    </CommonWebBox>
  );
}

export default Create;
