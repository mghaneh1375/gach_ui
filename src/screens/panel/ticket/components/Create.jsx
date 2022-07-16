import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  ErrorText,
  PhoneView,
} from '../../../../styles/Common';
import translator from '../../ticket/Translator';
import commonTranslator from '../../../../tranlates/Common';
import {useState} from 'react';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {priorityKeyVals, sectionKeyVals} from './KeyVals';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchUser from '../../../../components/web/SearchUser/SearchUser';
import {finalize, submit} from './Show/Utility';

function Create(props) {
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [foundUser, setFoundUser] = useState();
  const [section, setSection] = useState('');
  const [priority, setPriority] = useState('');
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState();

  const toggleShowSearchUser = () => {
    setShowSearchUser(!showSearchUser);
  };

  const allStyle = {
    maxWidth: '100%',
    border: 'none',
    backgroundColor: '#F1F1F1',
    height: 50,
    padding: 5,
  };

  const send = async () => {
    if (foundUser === undefined || foundUser.length === 0) {
      setErr(commonTranslator.pleaseFillAllFields);
      return;
    }

    props.setLoading(true);
    let res = await submit(
      {
        title: title,
        description: desc,
        section: section,
        priority: priority,
        userId: foundUser[0].id,
      },
      props.token,
    );
    props.setLoading(false);
    if (res === null || res === undefined) return;

    if (!props.isAdmin) res = await finalize(res.id, props.token);

    if (res !== null) {
      props.addTicket(res);
      props.setMode('list');
    }
  };

  return (
    <View zIndex={5}>
      <SearchUser
        setFinalResult={setFoundUser}
        setShow={setShowSearchUser}
        token={props.token}
        setLoading={props.setLoading}
        show={showSearchUser}
      />

      <CommonWebBox
        header={translator.title}
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        style={{margin: 10, paddingRight: 25}}>
        <PhoneView>
          <JustBottomBorderTextInput
            isHalf={true}
            value={
              foundUser !== undefined
                ? foundUser.map(elem => elem.name).join(',')
                : ''
            }
            placeholder={translator.nameOfReciver}
            disable={true}
          />
          <FontIcon
            kind={'normal'}
            theme={'rect'}
            back={'yellow'}
            icon={faPlus}
            onPress={() => toggleShowSearchUser()}
          />
        </PhoneView>

        <PhoneView style={{margin: 10}}>
          <JustBottomBorderSelect
            isHalf={true}
            setter={setPriority}
            values={priorityKeyVals}
            value={priorityKeyVals.find(elem => elem.id === priority)}
            placeholder={translator.priority}
          />
          <JustBottomBorderSelect
            isHalf={true}
            setter={setSection}
            values={sectionKeyVals}
            value={sectionKeyVals.find(elem => elem.id === section)}
            placeholder={translator.section}
          />
        </PhoneView>
      </CommonWebBox>
      <CommonWebBox style={{marginTop: -5}}>
        <CommonTextInput
          placeholder={translator.title}
          value={title}
          onChangeText={text => setTitle(text)}
          parentStyle={{width: '100%'}}
          style={allStyle}
        />
        <CommonTextInput
          multiline={true}
          placeholder={translator.desc}
          value={desc}
          onChangeText={text => setDesc(text)}
          parentStyle={{width: '100%'}}
          style={{
            ...allStyle,
            marginTop: 15,
            height: 200,
          }}
        />
        <CommonButton title={translator.confrim} onPress={() => send()} />
        {err !== undefined && <ErrorText text={err} />}
      </CommonWebBox>
    </View>
  );
}

export default Create;
