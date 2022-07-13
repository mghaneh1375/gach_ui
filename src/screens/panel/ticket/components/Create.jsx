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
    borderRadius: 10,
  };

  return (
    <>
      <CommonWebBox
        header={Translator.topic}
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        style={{margin: 10}}>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={Translator.nameOfReciver}
            value={nameOfReciver}
            onChangeText={text => setNameOfReciver(text)}
            parentStyle={{width: '30%'}}
          />
          {/* <JustBottomBorderSelect
            isHalf={true}
            setter={setNameOfReciver}
            values={nameOfReciverKeyVals}
            value={nameOfReciverKeyVals.find(elem => elem.id === nameOfReciver)}
            placeholder={Translator.nameOfReciver}
          /> */}
          <TextIcon theme={'rect'} icon={faPlus} />
        </PhoneView>

        <PhoneView style={{margin: 10}}>
          <JustBottomBorderTextInput
            placeholder={Translator.section}
            value={section}
            onChangeText={text => setSection(text)}
            parentStyle={{width: '50%'}}
            style={{maxWidth: '100%'}}
          />
          <JustBottomBorderTextInput
            placeholder={Translator.priority}
            value={priority}
            onChangeText={text => setPriority(text)}
            parentStyle={{width: '30%'}}
          />
        </PhoneView>
      </CommonWebBox>
      <CommonWebBox style={{marginTop: -5}}>
        <JustBottomBorderTextInput
          placeholder={Translator.title}
          value={title}
          onChangeText={text => setTitle(text)}
          parentStyle={{width: '100%'}}
          style={{
            ...allStyle,
          }}
        />
        <JustBottomBorderTextInput
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
