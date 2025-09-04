import React from 'react';
import {globalStateContext, dispatchStateContext} from '@/App';
import AccountCharge from '../../../components/web/accountCharge/AccountCharge';
import {MyView} from '@/styles';
function ChargeAccount(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  return (
    <MyView
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AccountCharge
        token={props.token}
        user={props.user}
        setLoading={setLoading}
      />
    </MyView>
  );
}
export default ChargeAccount;
