import {View} from 'react-native-web';
import {PhoneView} from '../../../../../../../styles/Common';
import {LargePopUp} from '../../../../../../../styles/Common/PopUp';
import commonTranslator from '../../../../../../../tranlates/Common';
import {CommonButton} from '../../../../../../../styles/Common';

function Ops(props) {
  return (
    <View style={{zIndex: '10'}}>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView style={{flexWrap: 'wrap'}}>
          <CommonButton
            onPress={() => props.setMode('list')}
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
