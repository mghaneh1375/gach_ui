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
import commonTranslator from '../../../../translator/Common';
import React, {useState} from 'react';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {priorityKeyVals, sectionKeyVals} from './KeyVals';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faPaperclip, faPlus} from '@fortawesome/free-solid-svg-icons';
import SearchUser from '../../../../components/web/SearchUser/SearchUser';
import {addFile, finalize, submit} from './Show/Utility';
import {changeText, showError} from '../../../../services/Utility';
import {useFilePicker} from 'use-file-picker';
import UserTinyPic from '../../../../components/web/LargeScreen/UserTinyPic';
import AttachBox from './Show/AttachBox/AttachBox';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';

function Create(props) {
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [foundUser, setFoundUser] = useState();
  const [section, setSection] = useState('');
  const [priority, setPriority] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState();

  const [student, setStudent] = useState();
  const [myStudents, setMyStudents] = useState();

  const [advisor, setAdvisor] = useState();
  const [myAdvisors, setMyAdvisors] = useState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchMyAdvisors = React.useCallback(() => {
    if (isWorking || myAdvisors !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      generalRequest(
        routes.getMyAdvisors,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        return;
      }
      setMyAdvisors(
        res[0].map(e => {
          return {id: e.id, item: e.name};
        }),
      );
      setIsWorking(false);
    });
  }, [props, isWorking, myAdvisors]);

  const fetchMyStudents = React.useCallback(() => {
    if (isWorking || myStudents !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      generalRequest(
        routes.getStudentsDigest,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        return;
      }
      setMyStudents(
        res[0].map(e => {
          return {id: e.id, item: e.name};
        }),
      );
      setIsWorking(false);
    });
  }, [props, isWorking, myStudents]);

  React.useEffect(() => {
    if (section !== 'advisor' || myAdvisors !== undefined) return;
    if (props.isAdvisor) fetchMyStudents();
    else fetchMyAdvisors();
  }, [section, myAdvisors, fetchMyAdvisors, fetchMyStudents, props.isAdvisor]);

  const toggleShowSearchUser = () => {
    setShowSearchUser(!showSearchUser);
  };

  React.useEffect(() => {
    if (
      props.section !== undefined &&
      sectionKeyVals.find(elem => elem.id === props.section) !== undefined
    )
      setSection(props.section);
  }, [props.section]);

  React.useEffect(() => {
    if (props.name !== undefined && props.id !== undefined) {
      setRefs([{id: props.id, item: props.name}]);
      setRefId(props.id);
    }
  }, [props.name, props.id]);

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

    if (section === 'advisor' && !props.isAdvisor && advisor === undefined) {
      showError('لطفا مشاور را تعیین کنید');
      return;
    }

    if (section === 'advisor' && props.isAdvisor && student === undefined) {
      showError('لطفا دانش آموز را تعیین کنید');
      return;
    }

    props.setLoading(true);

    let data = {
      title: title,
      description: desc,
      section: section,
      priority: priority,
      userId: props.isAdmin ? foundUser[0].id : undefined,
    };

    if (section === 'advisor') {
      if (props.isAdvisor) data.userId = student;
      else data.advisorId = advisor;
    }

    if (refId !== undefined) {
      if (refId.indexOf('_') !== -1) {
        let tmp = refId.split('_');
        data.refId = tmp[1];
        data.additional = tmp[0];
      } else data.refId = refId;
    }

    let res = await submit(data, props.token);

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

    if (!props.isAdmin && !props.isAdvisor)
      res = await finalize(res.id, props.token);

    if (res !== null) {
      if (props.isAdmin) res.chats[0].files = files;
      props.addTicket(res);
      props.setMode('list');
    }

    props.setLoading(false);
  };

  const [refId, setRefId] = useState();
  const [refs, setRefs] = useState();

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
        header={translator.create}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        {props.isAdmin && (
          <PhoneView style={{gap: 15}}>
            <JustBottomBorderTextInput
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
              parentStyle={{marginTop: 6}}
              kind={'normal'}
              theme={'rect'}
              back={'yellow'}
              icon={faPlus}
              onPress={() => toggleShowSearchUser()}
            />
          </PhoneView>
        )}

        <PhoneView style={{gap: 15}}>
          <JustBottomBorderSelect
            setter={setPriority}
            values={priorityKeyVals}
            value={priorityKeyVals.find(elem => elem.id === priority)}
            placeholder={translator.priority}
            subText={translator.priority}
          />
          <JustBottomBorderSelect
            setter={setSection}
            values={sectionKeyVals}
            value={sectionKeyVals.find(elem => elem.id === section)}
            placeholder={translator.section}
            subText={translator.section}
          />
          {section === 'advisor' && myAdvisors !== undefined && (
            <JustBottomBorderSelect
              setter={setAdvisor}
              values={myAdvisors}
              value={myAdvisors.find(elem => elem.id === advisor)}
              placeholder={translator.advisor}
              subText={translator.advisor}
            />
          )}
          {section === 'advisor' && myStudents !== undefined && (
            <JustBottomBorderSelect
              setter={setStudent}
              values={myStudents}
              value={myStudents.find(elem => elem.id === student)}
              placeholder={translator.student}
              subText={translator.student}
            />
          )}
          {refs !== undefined && (
            <JustBottomBorderSelect
              setter={setRefId}
              values={refs}
              value={refs.find(elem => elem.id === refId)}
              placeholder={translator.item}
              subText={translator.item}
            />
          )}
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
                  removeAttach={() => {
                    removeAttach(index);
                  }}
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
