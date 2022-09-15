import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {showSuccess} from '../../../../services/Utility';
import {CommonButton, MyView, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {editUserInCert} from '../Utility';

function Ops(props) {
  const [userData, setUserData] = useState(props.user.params);
  const [showRemovePane, setShowRemovePane] = useState(false);

  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess(res.excepts);
    props.toggleShowPopUp();
    props.setData(undefined);
  };

  const toggleShowRemovePane = () => {
    setShowRemovePane(!showRemovePane);
  };

  return (
    <MyView>
      {showRemovePane && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          url={routes.removeStudentsFromCertificate + props.certId}
          expected={['excepts', 'doneIds']}
          data={{items: [props.user.id]}}
          afterFunc={afterRemove}
          toggleShowPopUp={toggleShowRemovePane}
        />
      )}
      {!showRemovePane && (
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
              <CommonButton
                onPress={() => toggleShowRemovePane()}
                theme={'orangeRed'}
                title={'حذف'}
              />
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
      )}
    </MyView>
  );
}

export default Ops;
