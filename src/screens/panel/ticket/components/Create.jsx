import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  ErrorText,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import translator from '../../ticket/Translator';
import commonTranslator from '../../../../tranlates/Common';
import {useState} from 'react';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {priorityKeyVals, sectionKeyVals} from './KeyVals';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faPaperclip, faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchUser from '../../../../components/web/SearchUser/SearchUser';
import {finalize, submit} from './Show/Utility';
import {changeText} from '../../../../services/Utility';
import Add from './Show/Add';
import AttachBox from './Show/AttachBox/AttachBox';
import {useFilePicker} from 'use-file-picker';
import ChatImage from './Show/ChatImage/ChatImage';

function Create(props) {
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [foundUser, setFoundUser] = useState();
  const [section, setSection] = useState('');
  const [priority, setPriority] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState();

  const toggleShowSearchUser = () => {
    setShowSearchUser(!showSearchUser);
  };

  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['image/*', '.pdf', '.xls', '.xlsx', '.docx'],
      readAs: 'DataURL',
      multiple: true,
      limitFilesConfig: {max: 5},
    });

  const removeAttach = index => {
    remove(index);
  };

  const allStyle = {
    maxWidth: '100%',
    border: 'none',
    backgroundColor: '#F1F1F1',
    height: 50,
    padding: 5,
  };

  const send = async () => {
    if (props.isAdmin && (foundUser === undefined || foundUser.length === 0)) {
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
        userId: props.isAdmin ? foundUser[0].id : undefined,
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
      {props.isAdmin && (
        <SearchUser
          setFinalResult={setFoundUser}
          setShow={setShowSearchUser}
          token={props.token}
          setLoading={props.setLoading}
          show={showSearchUser}
        />
      )}

      <CommonWebBox
        header={translator.title}
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        style={{margin: 10, paddingRight: 25}}>
        {props.isAdmin && (
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
        )}

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
          onChangeText={e => changeText(e, setTitle)}
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
        {err !== undefined && <ErrorText text={err} />}
      </CommonWebBox>
      <CommonWebBox>
        <EqualTwoTextInputs>
          <PhoneView>
            <ChatImage dir={'right'} src={props.user.user.pic} />
            <SimpleText text={'راهنما'} />
          </PhoneView>
          <PhoneView>
            <SimpleFontIcon
              onPress={() => openFileSelector()}
              kind={'normal'}
              icon={faPaperclip}
            />
            <CommonButton
              icon={faPlus}
              title={translator.confrim}
              onPress={() => send()}
            />
          </PhoneView>
        </EqualTwoTextInputs>
        {filesContent !== undefined && filesContent.length > 0 && (
          <PhoneView style={{marginTop: 20}}>
            {filesContent.map((file, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={file.name}
                  fileContent={file.content}
                  removeAttach={() => removeAttach(index)}
                />
              );
            })}
          </PhoneView>
        )}
      </CommonWebBox>
    </View>
  );
}

export default Create;
