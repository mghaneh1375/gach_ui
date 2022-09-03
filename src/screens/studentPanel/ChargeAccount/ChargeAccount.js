import React from 'react';
import {MyView} from 'react-native-multi-selectbox';
import AccountCharge from '../../../components/web/AccountCharge/AccountCharge';

function ChargeAccount(props) {
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
        setLoading={props.setLoading}
      />
    </MyView>
  );
}

export default ChargeAccount;
