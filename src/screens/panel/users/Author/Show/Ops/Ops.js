import {View} from 'react-native-web';
import {CommonButton, PhoneView} from '../../../../../../styles/Common';
import {LargePopUp} from '../../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../../tranlates/Common';
import Translate from '../../Translator';
//import {login, toggleStatus} from './Utility';

function Ops(props) {
  return (
    <View style={{zIndex: '10'}}>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView style={{flexWrap: 'wrap'}}>
          <CommonButton theme={'transparent'} title={commonTranslator.edit} />
          <CommonButton
            onPress={() => props.setMode('show')}
            title={commonTranslator.delete}
            theme={'transparent'}
          />
        </PhoneView>
      </LargePopUp>
    </View>
  );
}

export default Ops;
