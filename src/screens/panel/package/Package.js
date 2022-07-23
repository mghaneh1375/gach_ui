import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {TinyTextIcon} from '../../../styles/Common/TextIcon';
import Card from './card/Card';
import Translate from './Translate';

function Package() {
  return (
    <View>
      <CommonWebBox>
        <SimpleText text={Translate.buyQuiz} />
        <Card
          isAdmin={true}
          onvanTakhfif={Translate.onvanTakhfif}
          mizanTakhfif={Translate.mizanTakhfif}
          options0={Translate.test}
          subOption0={Translate.test}
          options1={Translate.test}
          subOptions1={Translate.test}
          submitText={Translate.test}
        />
      </CommonWebBox>
    </View>
  );
}

export default Package;
