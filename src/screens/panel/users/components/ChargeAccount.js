import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {dispatchUsersContext, usersContext} from './Context';
import Translator from '../Translator';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';
import {chargeAccount} from './Utility';

function ChargeAccount(props) {
  const useGlobalState = () => [
    React.useContext(usersContext),
    React.useContext(dispatchUsersContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [money, setMoney] = useState();
  const [coin, setCoin] = useState();

  React.useEffect(() => {
    if (state.selectedUser === undefined) return;
    setMoney(state.selectedUser.money);
    setCoin(state.selectedUser.coin);
  }, [state.selectedUser]);

  return (
    <CommonWebBox
      header={'شارژ حساب ' + state.selectedUser.name}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={styles.gap10}>
        {money !== undefined && (
          <JustBottomBorderTextInput
            value={money}
            onChangeText={e => setMoney(e)}
            placehoder={Translator.currMoney}
            subText={Translator.currMoney}
          />
        )}
        {coin !== undefined && (
          <JustBottomBorderTextInput
            value={coin}
            onChangeText={e => setCoin(e)}
            placehoder={Translator.currCoin}
            subText={Translator.currCoin}
          />
        )}
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res = await chargeAccount(
              coin,
              money,
              state.selectedUser.id,
              props.token,
            );
            props.setLoading(false);
            if (res !== null) {
              state.selectedUser.money = money;
              state.selectedUser.coin = coin;
              dispatch({selectedUser: state.selectedUser});
            }
          }}
          title={commonTranslator.confirm}
          theme={'dark'}
        />
      </PhoneView>
    </CommonWebBox>
  );
}

export default ChargeAccount;
