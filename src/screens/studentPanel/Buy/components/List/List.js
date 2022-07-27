import {View} from 'react-native-web';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
} from '../../../../../styles/Common';
import {useState} from 'react';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {Translate} from '../../Translate';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../tranlates/Common';
import Digest from '../Digest/Digest';

function List(props) {
  const [type, setType] = useState();

  return (
    <View>
      <CommonWebBox>
        {/* backBtn={true} onBackClick={() => props.setMOde('list')} */}
        <View>
          <TextIcon
            onPress={() => props.setMode('create')}
            theme={'rect'}
            text={Translate.sendRequest}
            icon={faPlus}
          />
        </View>
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
      {props.tickets !== undefined &&
        props.tickets.map((elem, index) => {
          return (
            <Digest
              ticket={elem}
              setSelectedTicket={props.setSelectedTicket}
              setMode={props.setMode}
              key={index}
              removeTicket={props.removeTicket}
            />
          );
        })}
    </View>
  );
}

export default List;
