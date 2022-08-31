import React, {useState} from 'react';
import {CommonWebBox, PhoneView, CommonButton} from '../../../../styles/Common';
import Translate from '../Translate';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {changeText} from '../../../../services/Utility';
import {addStudents} from '../Utility';
import translator from '../../../../translator/Common';

function Create(props) {
  const [name, setName] = useState('testsadsa');
  const [lastname, setLastname] = useState('asadasdasd');
  const [tel, setTel] = useState('۰۹۱۶۷۸۹۶۵۴۳');
  const [nid, setNid] = useState('۰۰۰۹۰۹۰۰۰۲');
  const [password, setPassword] = useState('12345678');
  const [rPassword, setRPassword] = useState('12345678');

  return (
    <CommonWebBox
      header={Translate.addStudents}
      addBtn={true}
      backBtn={true}
      onAddClick={() => props.setMode('addAll')}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderTextInput
          onChangeText={text => setName(text)}
          placeholder={commonTranslator.name}
          subText={commonTranslator.name}
          value={name}
        />
        <JustBottomBorderTextInput
          onChangeText={text => setLastname(text)}
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
          value={lastname}
        />
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setNid)}
          placeholder={commonTranslator.NID}
          subText={commonTranslator.NID}
          value={nid}
          justNum={true}
        />
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setTel)}
          placeholder={commonTranslator.tel}
          subText={commonTranslator.optional}
          value={tel}
          justNum={true}
        />
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setPassword)}
          type={'password'}
          placeholder={commonTranslator.password}
          subText={commonTranslator.password}
          value={password}
        />
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setRPassword)}
          type={'password'}
          placeholder={
            commonTranslator.repeat + ' ' + commonTranslator.password
          }
          subText={commonTranslator.repeat + ' ' + commonTranslator.password}
          value={rPassword}
        />
      </PhoneView>
      <CommonButton
        title={commonTranslator.confrim}
        onPress={async () => {
          props.setLoading(true);
          let data = {
            firstName: name,
            lastName: lastname,
            NID: nid,
            password: password,
            rPassword: rPassword,
            phone: tel,
          };
          let res = props.data === undefined;
          await addStudents(data, props.token);
          // : await editStudents(props.data.id, data, props.token);

          props.setLoading(false);
          if (res !== null) {
            if (props.data === undefined) props.addItem(res);
            else {
              data.id = props.data.id;
              props.update(data);
            }
            props.setMode('list');
          }
        }}
      />
    </CommonWebBox>
  );
}

export default Create;
