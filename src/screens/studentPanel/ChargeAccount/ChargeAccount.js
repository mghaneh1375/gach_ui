import React from 'react';
import {MyView} from 'react-native-multi-selectbox';
import AccountCharge from '../../../components/web/AccountCharge/AccountCharge';

function ChargeAccount() {
  return (
    <MyView
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AccountCharge />
    </MyView>
  );
}

export default ChargeAccount;
