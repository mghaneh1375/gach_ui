import React, {useState} from 'react';
import {
  CommonButton,
  CommonRadioButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../styles/Common/PopUp';
import CommonDataTable from '../../../styles/Common/CommonDataTable';
import commonTranslator from '../../../translator/Common';
import {search} from './Utility';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../styles/Common/Styles';

const SearchUser = props => {
  const [users, setUsers] = useState(undefined);
  const [mode, setMode] = useState('name');
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [NID, setNID] = useState();
  const [phone, setPhone] = useState();
  const [mail, setMail] = useState();
  const [selected, setSelected] = useState([]);

  const changeMode = new_mode => {
    setMode(new_mode);
  };
  if (!props.show) return <></>;

  let columns = [
    {
      name: commonTranslator.nameAndLast,
      selector: row => row.name,
      grow: 1,
    },
    {
      name: commonTranslator.NID,
      selector: row => row.NID,
      grow: 1,
    },
    {
      name: commonTranslator.mail,
      selector: row => row.mail,
      grow: 1,
    },
    {
      name: commonTranslator.phone,
      selector: row => row.phone,
      grow: 1,
    },
    {
      name: '',
      style: {
        justifyContent: 'end',
      },
      cell: (row, index, column, id) => {
        if (selected.indexOf(users[index]) === -1) return <></>;

        return (
          <SimpleFontIcon
            kind={'normal'}
            style={{marginLeft: 100, alignSelf: 'center'}}
            icon={faTrash}
          />
        );
      },
      grow: 4,
    },
  ];

  return (
    <LargePopUp
      toggleShowPopUp={() => props.setShow(false)}
      removeCancel={true}
      title={commonTranslator.searchUser}>
      <PhoneView style={{gap: 30}}>
        <SimpleText
          style={{alignSelf: 'center'}}
          text={commonTranslator.searchBy}
        />
        <CommonRadioButton
          status={mode === 'name' ? 'checked' : 'unchecked'}
          onPress={() => changeMode('name')}
          text={commonTranslator.nameAndLast}
        />
        <CommonRadioButton
          status={mode === 'NID' ? 'checked' : 'unchecked'}
          onPress={() => changeMode('NID')}
          text={commonTranslator.NID}
        />
        <CommonRadioButton
          status={mode === 'mail' ? 'checked' : 'unchecked'}
          onPress={() => changeMode('mail')}
          text={commonTranslator.mail}
        />
        <CommonRadioButton
          status={mode === 'phone' ? 'checked' : 'unchecked'}
          onPress={() => changeMode('phone')}
          text={commonTranslator.phone}
        />
      </PhoneView>
      <MyView style={{marginTop: 30, marginBottom: 30}}>
        {mode === 'name' && (
          <PhoneView style={{...styles.gap15}}>
            <JustBottomBorderTextInput
              onChangeText={e => setName(e)}
              placeholder={commonTranslator.firstname}
            />
            <JustBottomBorderTextInput
              onChangeText={e => setLastName(e)}
              placeholder={commonTranslator.lastname}
            />
          </PhoneView>
        )}
        {mode === 'NID' && (
          <PhoneView>
            <JustBottomBorderTextInput
              justNum={true}
              onChangeText={e => setNID(e)}
              placeholder={commonTranslator.NID}
            />
          </PhoneView>
        )}
        {mode === 'mail' && (
          <PhoneView>
            <JustBottomBorderTextInput
              onChangeText={e => setMail(e)}
              placeholder={commonTranslator.mail}
            />
          </PhoneView>
        )}
        {mode === 'phone' && (
          <PhoneView>
            <JustBottomBorderTextInput
              justNum={true}
              onChangeText={e => setPhone(e)}
              placeholder={commonTranslator.phone}
            />
          </PhoneView>
        )}

        <EqualTwoTextInputs>
          <CommonButton
            theme={'dark'}
            title={commonTranslator.search}
            onPress={async () => {
              props.setLoading(true);
              let res = await search(
                props.token,
                mode,
                name,
                lastName,
                phone,
                mail,
                NID,
              );
              setUsers(res);
              props.setLoading(false);
            }}
          />
          <CommonButton
            onPress={() => props.setShow(false)}
            title={commonTranslator.cancel}
          />
        </EqualTwoTextInputs>

        <CommonDataTable
          onRowSelect={selectedRows => setSelected(selectedRows)}
          groupOps={[]}
          columns={columns}
          data={users}
        />

        <CommonButton
          onPress={() => {
            props.setFinalResult(selected);
            props.setShow(false);
          }}
          style={{alignSelf: 'flex-start'}}
          title={commonTranslator.confirmChanges}
          theme={'dark'}
        />
      </MyView>
    </LargePopUp>
  );
};

export default SearchUser;
