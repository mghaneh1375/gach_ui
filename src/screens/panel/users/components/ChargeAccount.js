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

  const [wantedUser, setWantedUser] = useState();

  const setUser = React.useCallback(() => {
    if (props.wantedUser !== undefined && state.selectedUser === undefined)
      dispatch({selectedUser: props.wantedUser});
  }, [dispatch, props.wantedUser, state.selectedUser]);

  React.useEffect(() => {
    if (props.wantedUser === undefined) return;
    setWantedUser(props.wantedUser);
  }, [props.wantedUser]);

  React.useEffect(() => {
    if (state.selectedUser === undefined) return;
    setWantedUser(state.selectedUser);
  }, [state.selectedUser]);

  React.useEffect(() => {
    if (wantedUser == undefined) return;

    setMoney(wantedUser.money === undefined ? '' : wantedUser.money);
    setCoin(wantedUser.coin === undefined ? '' : wantedUser.coin);
  }, [wantedUser]);

  if (wantedUser === undefined) return <></>;
  return (
    <CommonWebBox
      header={
        wantedUser.name === undefined
          ? 'شارژ حساب ' + wantedUser.firstName + ' ' + wantedUser.lastName
          : 'شارژ حساب ' + wantedUser.name
      }
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={styles.gap10}>
        {money !== undefined && (
          <JustBottomBorderTextInput
            value={money}
            onChangeText={e => setMoney(e)}
            placehoder={
              wantedUser.name === undefined
                ? Translator.addMoney
                : Translator.currMoney
            }
            subText={
              wantedUser.name === undefined
                ? Translator.addMoney
                : Translator.currMoney
            }
          />
        )}
        {coin !== undefined && (
          <JustBottomBorderTextInput
            value={coin}
            onChangeText={e => setCoin(e)}
            placehoder={
              wantedUser.name === undefined
                ? Translator.addCoin
                : Translator.currCoin
            }
            subText={
              wantedUser.name === undefined
                ? Translator.addCoin
                : Translator.addMoney
            }
          />
        )}
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res = await chargeAccount(
              coin,
              money,
              wantedUser.id,
              props.token,
            );
            props.setLoading(false);
            if (res !== null) {
              wantedUser.money = money;
              wantedUser.coin = coin;
              if (state.selectedUser !== undefined)
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
