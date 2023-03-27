import React, {useState} from 'react';
import {CommonWebBox, PhoneView, CommonButton} from '../../../../styles/Common';
import Translate from '../Translate';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {changeText, showSuccess} from '../../../../services/Utility';
import {addStudents} from '../Utility';
import translator from '../../../../translator/Common';
import UploadFile from '../../../../components/web/UploadFile';
import {BASE_SITE_NAME} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';

function Create(props) {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [tel, setTel] = useState();
  const [nid, setNid] = useState();
  const [password, setPassword] = useState();
  const [rPassword, setRPassword] = useState();

  const [showUploadPane, setShowUploadPane] = useState(false);

  const [result, setResult] = useState(undefined);
  const [finalMsg, setFinalMsg] = useState();

  React.useEffect(() => {
    if (result === undefined || result.length === 0) return;
    if (result.errs === undefined || result.errs.length === 0) {
      setFinalMsg(result.excepts);
      showSuccess();
    } else setFinalMsg(result.excepts + '\n' + result.errs);
  }, [result]);

  return (
    <>
      {showUploadPane && (
        <UploadFile
          url={routes.addStudents + '/LAST_4_DIGIT_NID'}
          token={props.token}
          maxFileSize={6}
          accept={['.xls', '.xlsx']}
          expectedRes={['excepts', 'errs']}
          title={'اضافه کردن دسته جمعی دانش آموزان'}
          multi={false}
          toggleShow={() => setShowUploadPane(false)}
          setResult={setResult}
          finalMsg={finalMsg}
          helps={[
            {
              link: BASE_SITE_NAME + 'assets/add_students_sample.xlsx',
              text: 'دانلود فایل نمونه',
            },
          ]}
        />
      )}
      {!showUploadPane && (
        <CommonWebBox
          header={Translate.addStudents}
          btn={
            <PhoneView>
              <CommonButton
                theme={'dark'}
                title="افزودن دسته جمعی"
                onPress={() => setShowUploadPane(true)}
              />
              <CommonButton
                title={commonTranslator.back}
                onPress={() => props.setMode('list')}
              />
            </PhoneView>
          }>
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
              subText={
                commonTranslator.repeat + ' ' + commonTranslator.password
              }
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
      )}
    </>
  );
}

export default Create;
