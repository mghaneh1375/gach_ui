import {View} from 'react-native-web';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  SimpleText,
} from '../../../../../styles/Common';
import {useState} from 'react';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {Translate} from '../../Translate';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../tranlates/Common';
import Digest from '../Digest/Digest';

function List() {
  const [type, setType] = useState();

  return (
    <View>
      <CommonWebBox>
        <View>
          <TextIcon
            // onPress={() => changeMode('create')}
            theme={'rect'}
            text={Translate.sendRequest}
            icon={faPlus}
          />
        </View>
        <SimpleText text={'خرید آزمون'} />
      </CommonWebBox>
      <CommonWebBox style={{marginTop: -5}}>
        <EqualTwoTextInputs style={{padding: 5}}>
          <JustBottomBorderTextInput
            value={type}
            onChangeText={text => setType(text)}
            placeholder={Translate.showType}
            subText={commonTranslator.necessaryContent}
          />
          <CommonButton title={commonTranslator.show} theme={'dark'} />
        </EqualTwoTextInputs>
      </CommonWebBox>
      <Digest
        title={Translate.titleTicket}
        sendData={Translate.sendDate}
        unit={commonTranslator.Learn}
        nes={commonTranslator.necessary}
        condition={Translate.conditionAnswer}
        isTrash={true}
      />
    </View>
  );
}

export default List;
