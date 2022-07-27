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

function Digest({ticket, setSelectedTicket, setMode, removeTicket}) {
  return (
    <CommonWebBox header={ticket.title}>
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
            <SimpleText
              style={{...styleFontSize11}}
              text={Translate.sendDate}
            />
            <SimpleText style={{...styleFontSize15}} text={ticket.sendDate} />
          </View>
        </PhoneView>
        <PhoneView>
          <TinyTextIcon />
          <View>
            <SimpleText
              style={{...styleFontSize11}}
              text={commonTranslator.unit}
            />
            <SimpleText style={{...styleFontSize15}} text={ticket.sectionFa} />
          </View>
        </PhoneView>
        <PhoneView>
          <TinyTextIcon />
          <View>
            <SimpleText
              style={{...styleFontSize11}}
              text={commonTranslator.nes}
            />
            <SimpleText style={{...styleFontSize15}} text={ticket.priorityFa} />
          </View>
        </PhoneView>
      </PhoneView>
      <EqualTwoTextInputs>
        <PhoneView>
          <BigBoldBlueText text={ticket.statusFa} />
        </PhoneView>
        <PhoneView>
          {ticket.status !== 'finish' && (
            <FontIcon
              kind={'normal'}
              theme={'rect'}
              icon={faTrash}
              onPress={() => removeTicket(ticket.id)}
            />
          )}
          <CommonButton theme={'dark'} title={Translate.closeAll} />
          <CommonButton
            onPress={() => {
              setSelectedTicket(ticket);
              setMode('show');
            }}
            title={commonTranslator.view}
          />
        </PhoneView>
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Digest;
