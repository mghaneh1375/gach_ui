import {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../API/APIRoutes';
import {generalRequest} from '../../API/Utility';
import {
  CommonButton,
  CommonRadioButton,
  PhoneView,
  SimpleText,
} from '../../styles/Common';
import JustBottomBorderTextInput from '../../styles/Common/JustBottomBorderTextInput';
import vars from '../../styles/root';
import commonTranslator from '../../tranlates/Common';

const SearchUser = props => {
  const [users, setUsers] = useState(undefined);
  const [mode, setMode] = useState('name');
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [NID, setNID] = useState();
  const [phone, setPhone] = useState();
  const [mail, setMail] = useState();

  const setFinalResult = element => {
    props.setFinalResult(element);
    props.setShow(false);
  };

  const changeInput = (label, val) => {
    if (label === 'NID') setNID(val);
    else if (label === 'name') setName(val);
    else if (label === 'lastName') setLastName(val);
    else if (label === 'phone') setPhone(val);
    else if (label === 'mail') setMail(val);
  };

  const changeMode = new_mode => {
    setMode(new_mode);
  };

  const search = () => {
    let query;

    if (mode === 'name') query = 'name=' + name + '&lastname=' + lastName;
    else if (mode === 'phone') query = 'phone=' + phone;
    else if (mode === 'mail') query = 'mail=' + mail;
    else if (mode === 'NID') query = 'NID=' + NID;

    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.fetchTinyUser + query,
        'get',
        undefined,
        'users',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null && res[0] !== undefined) {
        console.log(typeof res[0]);
        setUsers(res[0]);
      } else setUsers([]);
    });
  };

  if (!props.show) return <></>;

  return (
    <View>
      <SimpleText text={commonTranslator.searchBy} />
      <PhoneView>
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
      {mode === 'name' && (
        <PhoneView>
          <JustBottomBorderTextInput
            onChangeText={e => changeInput('name', e)}
            placeholder={commonTranslator.firstname}
          />
          <JustBottomBorderTextInput
            onChangeText={e => changeInput('lastName', e)}
            placeholder={commonTranslator.lastname}
          />
        </PhoneView>
      )}
      {mode === 'NID' && (
        <PhoneView>
          <JustBottomBorderTextInput
            justNum={true}
            onChangeText={e => changeInput('NID', e)}
            placeholder={commonTranslator.NID}
          />
        </PhoneView>
      )}
      {mode === 'mail' && (
        <PhoneView>
          <JustBottomBorderTextInput
            onChangeText={e => changeInput('mail', e)}
            placeholder={commonTranslator.mail}
          />
        </PhoneView>
      )}
      {mode === 'phone' && (
        <PhoneView>
          <JustBottomBorderTextInput
            justNum={true}
            onChangeText={e => changeInput('phone', e)}
            placeholder={commonTranslator.phone}
          />
        </PhoneView>
      )}

      <CommonButton
        style={{backgroundColor: vars.ORANGE_RED}}
        title={commonTranslator.searchStudent}
        onPress={() => search()}
      />

      {users !== undefined &&
        users.length > 0 &&
        users.map((element, index) => {
          return (
            <SimpleText
              onPress={() => setFinalResult(element)}
              style={{
                cursor: 'pointer',
                padding: 5,
                border: '1px solid',
                width: 'max-content',
              }}
              key={index}
              text={element.nameFa + ' ' + element.lastNameFa}
            />
          );
        })}

      {users !== undefined && users.length === 0 && (
        <SimpleText text={commonTranslator.noResult} />
      )}
    </View>
  );
};

export default SearchUser;
