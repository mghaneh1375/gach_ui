import {View} from 'react-native-web';
import {CommonWebBox, PhoneView, SimpleText} from '../../../../styles/Common';

function Create(props) {
  return (
    <CommonWebBox>
      <View>
        <PhoneView>
          <SimpleText></SimpleText>
        </PhoneView>
      </View>
    </CommonWebBox>
  );
}

export default Create;
