import React, {useState} from 'react';
import {CommonWebBox, PhoneView, MyView} from '../../../../styles/Common';
import Translate from '../Translate';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {changeText} from '../../../../services/Utility';

function Create(props) {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [tel, setTel] = useState();
  const [nid, setNid] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rPassword, setRPassword] = useState();

  return (
    <CommonWebBox
      header={Translate.addAll}
      addBtn={true}
      backBtn={true}
      onAddClick={() => props.setMode('addAll')}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setName)}
          placeholder={commonTranslator.name}
          subText={commonTranslator.name}
          value={name}
        />
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setLastname)}
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
          onChangeText={text => changeText(text, setEmail)}
          placeholder={commonTranslator.email}
          subText={commonTranslator.optional}
          value={email}
        />
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setPassword)}
          placeholder={commonTranslator.email}
          subText={commonTranslator.optional}
          value={email}
        />
        <MyView>
          <PhoneView>
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
              subText={
                commonTranslator.repeat + ' ' + commonTranslator.password
              }
              value={rPassword}
            />
          </PhoneView>
        </MyView>
      </PhoneView>
    </CommonWebBox>
  );
}

export default Create;
