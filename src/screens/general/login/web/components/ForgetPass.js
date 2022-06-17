import {View} from 'react-native';
import {
  BlueTextFromStart,
  CommonButton,
  CommonTextInput,
} from '../../../../../styles/Common';
import commonTranlator from './../../../../../tranlates/Common';
import loginTranslator from './../../translate';

const ForgetPass = props => {
  return (
    <View>
      <BlueTextFromStart text={loginTranslator.forgetPass} />
      <CommonTextInput
        style={{marginTop: '20px'}}
        value={props.username}
        justNum={true}
        placeholder={commonTranlator.NID}
      />
      <View>
        <CommonButton style={{}} title={commonTranlator.continue} />
      </View>
    </View>
  );
};

export default ForgetPass;
