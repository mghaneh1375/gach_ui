import React from 'react';
import {CommonButton, PhoneView, MyView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../translator/Common';
import {login, toggleStatus} from './Utility';
import {usersContext, dispatchUsersContext} from './Context';
import {isUserAdvisor} from '../../../../services/Utility';

function Ops(props) {
  const useGlobalState = () => [
    React.useContext(usersContext),
    React.useContext(dispatchUsersContext),
  ];

  const [state, dispatch] = useGlobalState();
  const isAdvisor = isUserAdvisor(state.selectedUser);

  return (
    <MyView>
      <LargePopUp
        title={commonTranslator.opMenu}
        toggleShowPopUp={props.toggleShowPopUp}>
        <PhoneView>
          <CommonButton
            title={commonTranslator.seeInfo}
            onPress={() => window.open('/profile/' + state.selectedUser.id)}
            theme={'transparent'}
          />
          <CommonButton
            title={commonTranslator.entrance}
            onPress={async () => {
              let res = await login(
                props.setLoading,
                props.token,
                state.selectedUser.id,
              );
              if (res) {
                props.toggleShowPopUp();
                window.location.href = '/';
              }
            }}
            theme={'transparent'}
          />
          <CommonButton
            onPress={() => props.changeMode('changeLevel')}
            theme={'transparent'}
            title={commonTranslator.changeLevel}
          />
          <CommonButton
            onPress={() => {
              toggleStatus(
                props.setLoading,
                props.token,
                state.selectedUser.id,
                res => {
                  if (res !== null) {
                    state.selectedUser.status = res;
                    dispatch({needUpdate: true});
                    props.toggleShowPopUp();
                  }
                },
              );
            }}
            theme={'transparent'}
            title={commonTranslator.changeStatus}
          />
          <CommonButton
            theme={'transparent'}
            onPress={() => props.changeMode('changePass')}
            title={commonTranslator.changePassword}
          />
          <CommonButton
            theme={'transparent'}
            onPress={() => props.changeMode('chargeAccount')}
            title={'شارژ حساب'}
          />
          {isAdvisor && (
            <>
              <CommonButton
                theme={'transparent'}
                title={'مدیریت برچسب\u200Cهای مخصوص تدریس'}
                onPress={() => props.changeMode('teachTags')}
              />
              <CommonButton
                theme={'transparent'}
                title={'مدیریت برچسب\u200Cهای مخصوص مشاوره'}
                onPress={() => props.changeMode('advisorTags')}
              />
              <CommonButton
                theme={'transparent'}
                title={'تعیین درصد تسویه'}
                onPress={() => props.changeMode('setIRYSCPercent')}
              />
              <CommonButton
                theme={'transparent'}
                title={'تعیین اولویت نمایش'}
                onPress={() => props.changeMode('setPriority')}
              />
              <CommonButton
                theme={'transparent'}
                title={'مشاهده تراکنش ها'}
                onPress={() => props.changeMode('transactions')}
              />
            </>
          )}
          {!isAdvisor && (
            <CommonButton
              theme={'transparent'}
              onPress={() =>
                window.open(
                  '/studentEducationalHistory/' + state.selectedUser.id,
                  '_blank',
                )
              }
              title={commonTranslator.educationalHistory}
            />
          )}
        </PhoneView>
      </LargePopUp>
    </MyView>
  );
}

export default Ops;
