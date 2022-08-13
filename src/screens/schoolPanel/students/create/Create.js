import {useState} from 'react';
import {CommonWebBox, PhoneView, MyView} from '../../../../styles/Common';
import Translate from '../Translate';
import commonTranslator from '../../../../tranlates/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {View} from 'react-native';

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
      <PhoneView style={{gap: 10, flexWrap: 'wrap'}}>
        <JustBottomBorderTextInput
          onChangeText={text => setName(text)}
          isHalf={true}
          placeholder={commonTranslator.name}
          subText={commonTranslator.name}
          value={name}
        />
        <JustBottomBorderTextInput
          onChangeText={text => setLastname(text)}
          isHalf={true}
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
          value={lastname}
        />
        <JustBottomBorderTextInput
          onChangeText={text => setNid(text)}
          isHalf={true}
          placeholder={commonTranslator.NID}
          subText={commonTranslator.NID}
          value={nid}
          justNum={true}
        />
        <JustBottomBorderTextInput
          onChangeText={text => setTel(text)}
          isHalf={true}
          placeholder={commonTranslator.tel}
          subText={commonTranslator.optional}
          value={tel}
          justNum={true}
        />
        <JustBottomBorderTextInput
          onChangeText={text => setEmail(text)}
          isHalf={true}
          placeholder={commonTranslator.email}
          subText={commonTranslator.optional}
          value={email}
        />
        <JustBottomBorderTextInput
          onChangeText={text => setEmail(text)}
          isHalf={true}
          placeholder={commonTranslator.email}
          subText={commonTranslator.optional}
          value={email}
        />
        <MyView>
          <PhoneView>
            <JustBottomBorderTextInput
              onChangeText={text => setPassword(text)}
              isHalf={true}
              type={'password'}
              placeholder={commonTranslator.password}
              subText={commonTranslator.password}
              value={password}
            />
            <JustBottomBorderTextInput
              onChangeText={text => setRPassword(text)}
              isHalf={true}
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
