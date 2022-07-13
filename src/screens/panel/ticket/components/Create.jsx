import {View} from 'react-native-web';
import {
  CommonWebBox,
  PhoneView,
  SimpleText,
  ShrinkView,
} from '../../../../styles/Common';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import Translator from '../../ticket/Translator';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {useState} from 'react';
import {faBorderNone, faPlus} from '@fortawesome/free-solid-svg-icons';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {priorityKeyVals, sectionKeyVals} from './KeyVals';

function Create(props) {
  const [nameOfReciver, setNameOfReciver] = useState('');
  const [section, setSection] = useState('');
  const [priority, setPriority] = useState('');
  const [title, setTitle] = useState();
  const [textRequest, setTextRequest] = useState('');

  const allStyle = {
    maxWidth: '100%',
    border: 'none',
    backgroundColor: '#F1F1F1',
    height: 50,
    padding: 5,
  };

  return (
    <>
      <CommonWebBox
        header={Translator.title}
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        style={{margin: 10, paddingRight: 25}}>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={Translator.nameOfReciver}
            value={nameOfReciver}
            onChangeText={text => setNameOfReciver(text)}
            parentStyle={{width: '30%'}}
          />
          {/* <TextIcon theme={'rect'} icon={faPlus} onPress={} /> */}
        </PhoneView>

        <PhoneView style={{margin: 10}}>
          <JustBottomBorderSelect
            isHalf={true}
            setter={setPriority}
            values={priorityKeyVals}
            value={priorityKeyVals.find(elem => elem.id === priority)}
            placeholder={Translator.priority}
          />
          <JustBottomBorderSelect
            isHalf={true}
            setter={setSection}
            values={sectionKeyVals}
            value={sectionKeyVals.find(elem => elem.id === section)}
            placeholder={Translator.section}
          />
        </PhoneView>
      </CommonWebBox>
      <CommonWebBox style={{marginTop: -5}}>
        <CommonTextInput
          placeholder={Translator.title}
          value={title}
          onChangeText={text => setTitle(text)}
          parentStyle={{width: '100%'}}
          style={allStyle}
        />
        <CommonTextInput
          multiline={true}
          placeholder={Translator.textRequest}
          value={textRequest}
          onChangeText={text => setTextRequest(text)}
          parentStyle={{width: '100%'}}
          style={{
            ...allStyle,
            marginTop: 15,
            height: 200,
          }}
        />
      </CommonWebBox>
    </>
  );
}

export default Create;
