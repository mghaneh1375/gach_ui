import {View} from 'react-native';
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
          <CommonButton
            theme={'transparent'}
            title={Translate.showTransaction}
            onPress={() => props.setMode('show')}
          />
          <CommonButton
            onPress={() => props.setMode('editAuthor')}
            title={commonTranslator.edit}
            theme={'transparent'}
          />
          <CommonButton theme={'transparent'} title={commonTranslator.delete} />
        </PhoneView>
      </LargePopUp>
    </View>
  );
}

export default Ops;
