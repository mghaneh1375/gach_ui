import React from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import ChangePass from '../../../general/profile/components/ChangePass';
import {usersContext} from './Context';

function ChangePassByAdmin(props) {
  const useGlobalState = () => [React.useContext(usersContext)];

  const [state] = useGlobalState();

  return (
    <CommonWebBox
      header={'تغییر رمزعبور'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {state.selectedUser !== undefined && (
        <ChangePass
          setLoading={props.setLoading}
          setMode={props.setMode}
          token={props.token}
          userId={state.selectedUser.id}
        />
      )}
    </CommonWebBox>
  );
}

export default ChangePassByAdmin;
