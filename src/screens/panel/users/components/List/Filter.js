import React, {useState} from 'react';
import {useParams} from 'react-router';
import {CommonButton, MyView, PhoneView} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../translator/Common';
import {filter} from '../Utility';

import {dispatchUsersContext} from '../Context';

function Filter(props) {
  const useGlobalState = () => [React.useContext(dispatchUsersContext)];

  const [dispatch] = useGlobalState();

  const [NID, setNID] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [grade, setGrade] = useState();
  const [branch, setBranch] = useState();

  const level = useParams().level;

  const filterLocal = async () => {
    props.setLoading(true);
    let res = await filter(
      props.token,
      level,
      NID,
      phone,
      name,
      lastName,
      branch !== undefined ? branch.id : undefined,
      grade !== undefined ? grade.id : undefined,
    );
    props.setLoading(false);
    // setNID(undefined);
    // setPhone(undefined);
    // setName(undefined);
    // setLastName(undefined);
    if (res === null) return;
    dispatch({users: res});
  };

  return (
    <MyView style={{gap: 20}}>
      <PhoneView style={{gap: 20}}>
        <JustBottomBorderTextInput
          value={NID}
          onChangeText={e => setNID(e)}
          justNum={true}
          placeholder={commonTranslator.NID}
          subText={commonTranslator.NID}
        />
        <JustBottomBorderTextInput
          value={phone}
          onChangeText={e => setPhone(e)}
          justNum={true}
          placeholder={commonTranslator.phone}
          subText={commonTranslator.phone}
        />
        <JustBottomBorderTextInput
          value={name}
          onChangeText={e => setName(e)}
          placeholder={commonTranslator.firstname}
          subText={commonTranslator.firstname}
        />
        <JustBottomBorderTextInput
          value={lastName}
          onChangeText={e => setLastName(e)}
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
        />
        <JustBottomBorderTextInput
          placeholder={commonTranslator.grade}
          subText={commonTranslator.grade}
          resultPane={true}
          setSelectedItem={e => setGrade(e)}
          values={props.grades}
          value={grade !== undefined ? grade.name : ''}
          reset={false}
        />
        <JustBottomBorderTextInput
          resultPane={true}
          placeholder={commonTranslator.branch}
          subText={commonTranslator.branch}
          setSelectedItem={e => setBranch(e)}
          reset={false}
          values={props.branches}
          value={branch != undefined ? branch.name : ''}
        />
      </PhoneView>

      <CommonButton
        onPress={() => filterLocal()}
        title={commonTranslator.search}
      />
    </MyView>
  );
}

export default Filter;
