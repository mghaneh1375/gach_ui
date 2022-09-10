import React, {useState} from 'react';
import {changeText} from '../../../../services/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';
import certTranslator from '../Translator';
import {addUserToCert, getCertificate} from '../Utility';

function AddStudent(props) {
  const [nid, setNid] = useState();
  const [userData, setUserData] = useState();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (props.selectedCertificate.params !== undefined || isWorking) return;
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
      let tmp = [];
      res[0].params.forEach(element => {
        tmp.push(undefined);
      });
      setUserData(tmp);
      props.update(res[0]);
      setIsWorking(false);
    });
  }, [props, isWorking]);
  return (
    <CommonWebBox
      header={certTranslator.addStudents}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{...styles.gap15}}>
        <JustBottomBorderTextInput
          onChangeText={text => changeText(text, setNid)}
          placeholder={commonTranslator.NID}
          subText={commonTranslator.NID}
          value={nid}
        />
        {props.selectedCertificate.params !== undefined &&
          props.selectedCertificate.params.map((elem, index) => {
            return (
              <JustBottomBorderTextInput
                value={userData[index]}
                onChangeText={e => {
                  let tmp = userData;
                  tmp[index] = e;
                  setUserData(tmp);
                }}
                key={index}
                placeholder={elem.title}
                subText={elem.title}
              />
            );
          })}
      </PhoneView>
      <CommonButton
        title={commonTranslator.confirm}
        onPress={async () => {
          let res = await addUserToCert(
            {params: userData},
            props.selectedCertificate.id,
            nid,
            props.token,
          );
          // console.log('====================================');
          // console.log(res);
          // console.log('====================================');
        }}
      />
    </CommonWebBox>
  );
}

export default AddStudent;
