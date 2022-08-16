import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  ErrorText,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../styles/Common';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import React, {useState} from 'react';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {priorityKeyVals, sectionKeyVals} from './KeyVals';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faPaperclip, faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchUser from '../../../../components/web/SearchUser/SearchUser';
import {addFile, finalize, submit} from './Show/Utility';
import {changeText} from '../../../../services/Utility';
import AttachBox from './Show/AttachBox/AttachBox';
import {useFilePicker} from 'use-file-picker';
import UserTinyPic from '../../../../components/web/LargeScreen/UserTinyPic';

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

    if (res === null || res === undefined) {
      props.setLoading(false);
      return;
    }
    let files = [];

    if (filesContent.length > 0) {
      for (let i = 0; i < filesContent.length; i++) {
        let fileRes = await addFile(props.token, filesContent[i], res.id);
        if (fileRes !== null) files.push(fileRes);
      }
    }

    if (!props.isAdmin) res = await finalize(res.id, props.token);

    if (res !== null) {
      if (props.isAdmin) res.chats[0].files = files;
      props.addTicket(res);
      props.setMode('list');
    }

    props.setLoading(false);
  };

  return (
    <MyView zIndex={5}>
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
        onBackClick={() => props.setMode('list')}>
        {props.isAdmin && (
          <PhoneView style={{gap: 10, marginBottom: 10}}>
            <JustBottomBorderTextInput
              isHalf={true}
              value={
                foundUser !== undefined
                  ? foundUser.map(elem => elem.name).join(',')
                  : ''
              }
              placeholder={translator.nameOfReciver}
              subText={translator.nameOfReciver}
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

        <PhoneView style={{gap: 10}}>
          <JustBottomBorderSelect
            isHalf={true}
            setter={setPriority}
            values={priorityKeyVals}
            value={priorityKeyVals.find(elem => elem.id === priority)}
            placeholder={translator.priority}
            subText={translator.priority}
          />
          <JustBottomBorderSelect
            isHalf={true}
            setter={setSection}
            values={sectionKeyVals}
            value={sectionKeyVals.find(elem => elem.id === section)}
            placeholder={translator.section}
            subText={translator.section}
          />
        </PhoneView>
      </CommonWebBox>
      <CommonWebBox style={{marginTop: -5}}>
        <CommonTextInput
          placeholder={translator.title}
          subText={translator.title}
          value={title}
          onChangeText={e => changeText(e, setTitle)}
          parentStyle={{width: '100%'}}
          style={allStyle}
        />
        <CommonTextInput
          multiline={true}
          placeholder={translator.desc}
          subText={translator.desc}
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
            <UserTinyPic pic={props.user.user.pic} />
            <SimpleText
              style={{alignSelf: 'center', marginRight: 20}}
              text={commonTranslator.help}
            />
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
    </MyView>
  );
}

export default Create;
