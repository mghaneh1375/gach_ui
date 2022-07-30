import {useState} from 'react';
import {faArrowLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native-web';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import Translate from '../Translator';
import commonTranslate from '../../../../../tranlates/Common';

function CreateAuthor(props) {
  const [name, setName] = useState();
  const [family, setFamily] = useState();
  const [tag, setTag] = useState();
  const changeMode = newMode => {
    props.setMode(newMode);
  };
  return (
    <CommonWebBox
      header={Translate.newAuthor}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <View>
        {/* <TextIcon
          onPress={() => changeMode('list')}
          theme={'rect'}
          text={Translate.author}
          kind={'normal'}
          icon={faArrowLeft}
        /> */}
        <PhoneView>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={Translate.authorName}
            value={name}
            onChangeText={text => setName(text)}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={Translate.authorFamily}
            value={family}
            onChangeText={text => setFamily(text)}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={Translate.tag}
            value={tag}
            onChangeText={text => setTag(text)}
            subText={commonTranslate.notNecessary}
          />
        </PhoneView>
        <CommonButton title={commonTranslate.confirm} />
      </View>
    </CommonWebBox>
  );
}

export default CreateAuthor;
