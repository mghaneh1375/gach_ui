import {View} from 'react-native-web';
import {
  BigBoldBlueText,
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {TinyTextIcon} from '../../../../../styles/Common/TextIcon';
import {Translate} from '../../Translate';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import commonTranslator from '../../../../../tranlates/Common';
import {styleFontSize15, styleFontSize11} from '../List/style';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
function TitleTicket({title, sendData, unit, nes, condition, isTrash}) {
  return (
    <CommonWebBox header={title}>
      <PhoneView
        style={{
          justifyContent: 'space-around',
          marginTop: 25,
          gap: 50,
          flexWrap: 'wrap',
        }}>
        <PhoneView>
          <TinyTextIcon />
          <View>
            <SimpleText style={{...styleFontSize11}} text={sendData} />
            <SimpleText
              style={{...styleFontSize15}}
              text={Translate.sendDate}
            />
          </View>
        </PhoneView>
        <PhoneView>
          <TinyTextIcon />
          <View>
            <SimpleText
              style={{...styleFontSize11}}
              text={commonTranslator.unit}
            />
            <SimpleText style={{...styleFontSize15}} text={unit} />
          </View>
        </PhoneView>
        <PhoneView>
          <TinyTextIcon />
          <View>
            <SimpleText
              style={{...styleFontSize11}}
              text={commonTranslator.nes}
            />
            <SimpleText style={{...styleFontSize15}} text={nes} />
          </View>
        </PhoneView>
      </PhoneView>
      <EqualTwoTextInputs>
        <PhoneView>
          <BigBoldBlueText text={condition} />
        </PhoneView>
        <PhoneView>
          {isTrash && (
            <FontIcon kind={'normal'} theme={'rect'} icon={faTrash} />
          )}
          <CommonButton theme={'dark'} title={Translate.closeAll} />
          <CommonButton title={commonTranslator.view} />
        </PhoneView>
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default TitleTicket;
