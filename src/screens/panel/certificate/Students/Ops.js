import React, {useState} from 'react';
import {CommonButton, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {editUserInCert} from '../Utility';

function Ops(props) {
  const [userData, setUserData] = useState(props.user.params);

  return (
    <LargePopUp
      btns={
        <PhoneView>
          <CommonButton
            onPress={async () => {
              props.setLoading(true);
              let res = await editUserInCert(
                {params: userData},
                props.certId,
                props.user.NID,
                props.token,
              );
              props.setLoading(false);
              if (res !== null) {
                props.toggleShowPopUp();
                props.setData(undefined);
              }
            }}
            theme={'dark'}
            title={'ویرایش'}
          />
          <CommonButton theme={'orangeRed'} title={'حذف'} />
        </PhoneView>
      }
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView style={{gap: 20}}>
        {props.params.map((elem, index) => {
          return (
            <JustBottomBorderTextInput
              subText={elem.title}
              value={userData[index]}
              onChangeText={e => {
                let tmp = [];
                userData.forEach(element => {
                  tmp.push(element);
                });
                tmp[index] = e;
                setUserData(tmp);
              }}
              key={index}
            />
          );
        })}
      </PhoneView>
    </LargePopUp>
  );
}

export default Ops;
