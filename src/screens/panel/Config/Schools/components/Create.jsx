import {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../Translator';

function Create(props) {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [grade, setGrade] = useState();
  const [kind, setKind] = useState();

  const changeText = (label, text) => {
    if (label === 'name') setName(text);
    else if (label === 'address') setAddress(text);
  };

  return (
    <View>
      <CommonWebBox header={translator.add} backBtn={true}>
        <PhoneView>
          <JustBottomBorderTextInput
            onChangeText={e => changeText('name', e)}
            value={name}
            placeholder={translator.name}
          />
        </PhoneView>
      </CommonWebBox>
    </View>
  );
}

export default Create;
