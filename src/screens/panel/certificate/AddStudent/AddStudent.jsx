import React, {useState} from 'react';
import {changeText} from '@/services/utility';
import {CommonButton, CommonWebBox, PhoneView} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '@/styles/common/styles';
import commonTranslator from '@/translator/common';
import certTranslator from '../translator';
import {addUserToCert, getCertificate} from '../utility';
function AddStudent(props) {
  const [nid, setNid] = useState();
  const [userData, setUserData] = useState();
  const [params, setParams] = useState();
  const [isWorking, setIsWorking] = useState(false);
  React.useEffect(() => {
    if (params !== undefined || isWorking) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      getCertificate(props.selectedCertificate.id, props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.setMode('list');
        return;
      }
      const tmp = [];
      res[0].params.forEach(element => {
        tmp.push(undefined);
      });
      setUserData(tmp);
      setParams(res[0].params);
      setIsWorking(false);
    });
  }, [props, isWorking, params]);
  return (
    <CommonWebBox
      header={certTranslator.addStudents}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView
        style={{
          ...styles.gap15,
        }}>
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setNid)}
          placeholder={commonTranslator.NID}
          subText={commonTranslator.NID}
          value={nid}
          justNum={true}
        />
        {params !== undefined &&
          params.map((elem, index) => {
            return (
              <JustBottomBorderTextInput
                value={userData[index]}
                onChangeText={e => {
                  const tmp = userData;
                  tmp[index] = e;
                  setUserData(tmp);
                }}
                key={index}
                subText={elem.title}
              />
            );
          })}
      </PhoneView>
      <CommonButton
        title={commonTranslator.confirm}
        onPress={async () => {
          const res = await addUserToCert(
            {
              params: userData,
            },
            props.selectedCertificate.id,
            nid,
            props.token,
          );
          if (res !== null) props.setMode('list');
        }}
      />
    </CommonWebBox>
  );
}
export default AddStudent;
